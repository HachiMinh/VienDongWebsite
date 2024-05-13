import { NextResponse } from "next/server";

export class HTTPOK extends NextResponse {
  constructor(body: BodyInit | null = "OK") {
    super(body, { status: 200 });
  }
}

export class HTTPBadRequest extends NextResponse {
  constructor(body: BodyInit | null = "Bad request") {
    super(body, { status: 400 });
  }
}

export class HTTPForbidden extends NextResponse {
  constructor(body: BodyInit | null = "Invalid credentials") {
    super(body, { status: 403 });
  }
}

export class HTTPInternalServerError extends NextResponse {
  constructor(body: BodyInit | null = "Internal server error") {
    super(body, { status: 500 });
  }
}
