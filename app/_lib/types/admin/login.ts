import { QueryResult } from "@vercel/postgres";
import { sha256 } from "js-sha256";

import { DatabaseFormatError, HeadersFormatError, JSONFormatError } from "../../errors";

export const SALT_LENGTH = 8;

export class LoginPayload {
  public readonly username: string;
  public readonly password: string;

  public constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  public passwordHashed(salt: string): string {
    if (salt.length !== SALT_LENGTH) {
      throw new Error(`Invalid salt length: expected ${SALT_LENGTH}, got ${salt.length}`);
    }

    return salt + sha256(salt + this.password);
  }

  public toHeaders(): Headers {
    const headers = new Headers();
    headers.set("Auth-Username", this.username);
    headers.set("Auth-Password", this.password);
    return headers;
  }

  public static fromJson(data: any): LoginPayload {
    if (typeof (data.username) !== "string") {
      throw new JSONFormatError("No \"username\" field");
    }
    if (typeof (data.password) !== "string") {
      throw new JSONFormatError("No \"password\" field");
    }

    return new LoginPayload(data.username, data.password);
  }

  public static fromHeaders(headers: Headers): LoginPayload {
    const username = headers.get("Auth-Username");
    if (username === null) {
      throw new HeadersFormatError("No \"Auth-Username\" header");
    }

    const password = headers.get("Auth-Password");
    if (password === null) {
      throw new HeadersFormatError("No \"Auth-Password\" header");
    }

    return new LoginPayload(username, password);
  }

  public static fromSessionStorage(): LoginPayload {
    const username = sessionStorage.getItem("username");
    if (username === null) {
      throw new HeadersFormatError("No \"username\" in sessionStorage");
    }

    const password = sessionStorage.getItem("password");
    if (password === null) {
      throw new HeadersFormatError("No \"password\" in sessionStorage");
    }

    return new LoginPayload(username, password);
  }
}

export class LoginPayloadRow {
  public readonly name: string;
  public readonly passwordHashed: string;
  public readonly salt: string;

  public constructor(name: string, passwordHashed: string) {
    this.name = name;
    this.passwordHashed = passwordHashed.substring(8);
    this.salt = passwordHashed.substring(0, 8);
  }

  public validate(payload: LoginPayload): boolean {
    return payload.passwordHashed(this.salt) === this.salt + this.passwordHashed;
  }

  public static fromRow(data: any): LoginPayloadRow {
    if (typeof (data.name) !== "string") {
      throw new DatabaseFormatError("No \"name\" field");
    }
    if (typeof (data.password_hashed) !== "string") {
      throw new DatabaseFormatError("No \"password_hashed\" field");
    }

    return new LoginPayloadRow(data.name, data.password_hashed);
  }

  public static fromRows(rows: QueryResult<any>): Array<LoginPayloadRow> {
    return rows.rows.map((row) => LoginPayloadRow.fromRow(row));
  }
}
