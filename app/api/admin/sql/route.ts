import { NextRequest, NextResponse } from "next/server";

import authenticate, { AuthenticationStatus } from "@/app/_lib/server/authenticate";
import { JSONFormatError } from "@/app/_lib/errors";
import { HTTPBadRequest, HTTPForbidden, HTTPInternalServerError, HTTPOK } from "@/app/_lib/types/responses";
import { SQLQuery } from "@/app/_lib/types/admin/sql";
import Database from "@/app/_lib/server/database";

export async function POST(request: NextRequest): Promise<NextResponse> {
  switch (await authenticate(request)) {
    case AuthenticationStatus.SUCCESS:
      try {
        const data = SQLQuery.fromJson(await request.json());
        const row = await Database.instance.query(data.query);

        return new HTTPOK(JSON.stringify(row));
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