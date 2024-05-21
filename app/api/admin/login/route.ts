import { NextRequest, NextResponse } from "next/server";

import authenticate, { AuthenticationStatus } from "@/app/_lib/server/authenticate";
import { HTTPForbidden, HTTPInternalServerError, HTTPOK } from "@/app/_lib/types/responses";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const result = await authenticate(request);
  switch (result.status) {
    case AuthenticationStatus.SUCCESS:
      return new HTTPOK();
    case AuthenticationStatus.FAILURE:
      return new HTTPForbidden();
    case AuthenticationStatus.SERVER_ERROR:
      return new HTTPInternalServerError();
  }
}
