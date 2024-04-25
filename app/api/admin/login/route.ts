import { NextRequest, NextResponse } from "next/server";
import { sha256 } from "js-sha256";

import BackendDatabase from "@/app/_lib/server/database";

interface LoginPayload {
  username: string;
  password: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const data = await request.json() as LoginPayload;

  // Type-checking
  if (typeof (data.username) !== "string") {
    return new NextResponse("No \"username\" field", { status: 400 });
  }
  if (typeof (data.password) !== "string") {
    return new NextResponse("No \"password\" field", { status: 400 });
  }

  const passwordHashed = sha256(data.password);

  const database = await BackendDatabase.getInstance();

  // Password checking
  const row = await database.connection.get("SELECT passwordHashed FROM admin_users WHERE user = ?", data.username);
  if (row !== undefined && row.passwordHashed === passwordHashed) {
    return new NextResponse(`Logged in as "${data.username}"`, { status: 200 });
  }

  return new NextResponse("Invalid credentials", { status: 403 });
}
