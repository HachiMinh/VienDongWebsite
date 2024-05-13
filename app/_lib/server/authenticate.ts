import { NextRequest } from "next/server";

import Database from "./database";
import { HeadersFormatError } from "../errors";
import { LoginPayload, LoginPayloadRow } from "../types/admin/login";

export enum AuthenticationStatus {
  SUCCESS,
  FAILURE,
  CLIENT_ERROR,
  SERVER_ERROR,
}

export default async function authenticate(request: NextRequest): Promise<AuthenticationStatus> {
  try {
    const data = LoginPayload.fromHeaders(request.headers);

    const rows = await Database.instance.query("SELECT * FROM admin WHERE name = $1", [data.username]);
    if (rows.rowCount > 0) {
      const compare = LoginPayloadRow.fromRow(rows.rows[0]);
      if (compare.validate(data)) {
        return AuthenticationStatus.SUCCESS;
      }
    }

    return AuthenticationStatus.FAILURE;
  } catch (e: any) {
    if (e instanceof HeadersFormatError) {
      return AuthenticationStatus.CLIENT_ERROR;
    }

    console.error(e);
    return AuthenticationStatus.SERVER_ERROR;
  }
}
