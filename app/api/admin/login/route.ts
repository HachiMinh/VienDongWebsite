import { NextRequest, NextResponse } from "next/server";
import { sha256 } from "js-sha256";

import { LoginPayload } from "@/app/_lib/types/admin/login";
import { TypeCheckingException } from "@/app/_lib/errors";

// Vercel filesystem is read-only, so sqlite is not an option
const PASSWORD_HASH = "4a7a891eea46056c63820a6c6d90c6cc185d7ed1e7ad89976fb415751a534d0e";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data = LoginPayload.fromObject(await request.json());

    const passwordHashed = sha256(data.password);
    if (data.username === "admin" && passwordHashed === PASSWORD_HASH) {
      return new NextResponse(`Logged in as "${data.username}"`, { status: 200 });
    }

    /*
    const database = await BackendDatabase.getInstance();
  
    // Password checking
    const row = await database.connection.get("SELECT passwordHashed FROM admin_users WHERE user = ?", data.username);
    if (row !== undefined && row.passwordHashed === passwordHashed) {
      return new NextResponse(`Logged in as "${data.username}"`, { status: 200 });
    }
    */

    return new NextResponse("Invalid credentials", { status: 403 });
  } catch (e: any) {
    if (e instanceof TypeCheckingException) {
      return new NextResponse(e.message, { status: 400 });
    }

    return new NextResponse("Internal server error", { status: 500 });
  }
}