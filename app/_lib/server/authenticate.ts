import { NextRequest } from "next/server";

import Database from "./database";
import { HeadersFormatError } from "../errors";
import { LoginPayload, LoginPayloadRow } from "../types/admin/login";

export enum AuthenticationStatus {
  SUCCESS,
  FAILURE,
  SERVER_ERROR,
}

class AuthenticationResult {
  public readonly status: AuthenticationStatus;
  public readonly data: LoginPayload | null;

  public constructor(status: AuthenticationStatus, data: LoginPayload | null = null) {
    this.status = status;
    this.data = data;
  }
}

export default async function authenticate(request: NextRequest): Promise<AuthenticationResult> {
  try {
    const data = LoginPayload.fromHeaders(request.headers);

    const rows = await Database.instance.query("SELECT * FROM admin WHERE name = $1", [data.username]);
    if (rows.rowCount > 0) {
      const compare = LoginPayloadRow.fromRow(rows.rows[0]);
      if (compare.validate(data)) {
        return new AuthenticationResult(AuthenticationStatus.SUCCESS, data);
      }
    }

    return new AuthenticationResult(AuthenticationStatus.FAILURE);
  } catch (e: any) {
    if (e instanceof HeadersFormatError) {
      return new AuthenticationResult(AuthenticationStatus.FAILURE);
    }

    console.error(e);
    return new AuthenticationResult(AuthenticationStatus.SERVER_ERROR);
  }
}
