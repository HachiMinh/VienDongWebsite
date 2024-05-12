import { NextRequest, NextResponse } from "next/server";

import Database from "@/app/_lib/server/database";
import { LoginPayload, LoginPayloadRow } from "@/app/_lib/types/admin/login";
import { JSONFormatError } from "@/app/_lib/errors";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data = LoginPayload.fromJson(await request.json());

    const rows = await Database.instance.query("SELECT * FROM admin WHERE name = $1", [data.username]);
    if (rows.rowCount > 0) {
      const compare = LoginPayloadRow.fromRow(rows.rows[0]);
      if (data.passwordHashed === compare.passwordHashed) {
        return new NextResponse(`Logged in as "${data.username}"`, { status: 200 });
      }
    }

    return new NextResponse("Invalid credentials", { status: 403 });
  } catch (e: any) {
    if (e instanceof JSONFormatError) {
      return new NextResponse(e.message, { status: 400 });
    }

    console.error(e);
    return new NextResponse("Internal server error", { status: 500 });
  }
}