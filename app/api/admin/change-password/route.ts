import { NextRequest, NextResponse } from "next/server";

import authenticate, { AuthenticationStatus } from "@/app/_lib/server/authenticate";
import Database from "@/app/_lib/server/database";
import { ChangePasswordPayload } from "@/app/_lib/types/admin/password";
import { JSONFormatError } from "@/app/_lib/errors";
import { HTTPBadRequest, HTTPForbidden, HTTPInternalServerError, HTTPOK } from "@/app/_lib/types/responses";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const result = await authenticate(request);
  switch (result.status) {
    case AuthenticationStatus.SUCCESS:
      try {
        const data = ChangePasswordPayload.fromJson(await request.json());
        console.log(data.oldPassword);
        console.log(result.data?.password);
        if (data.oldPassword === result.data?.password) {
          await Database.instance.query("UPDATE admin SET password_hashed = $1 WHERE name = $2", [data.hashNewPassword(), result.data?.username]);
          return new HTTPOK();
        }

        return new HTTPForbidden();
      } catch (e: any) {
        if (e instanceof JSONFormatError) {
          return new HTTPBadRequest();
        }

        console.error(e);
        return new HTTPInternalServerError(e);
      }
    case AuthenticationStatus.FAILURE:
      return new HTTPForbidden();
    case AuthenticationStatus.CLIENT_ERROR:
      return new HTTPBadRequest();
    case AuthenticationStatus.SERVER_ERROR:
      return new HTTPInternalServerError();
  }
}