import { QueryResult } from "@vercel/postgres";
import { sha256 } from "js-sha256";

import Authorization from "../../client/authorization";
import { HeadersFormatError } from "../../errors";
import { convertString } from "../converters";

/** The length of the salt string */
export const SALT_LENGTH = 8;

/**
 * Hash a password using a salt.
 * 
 * @param password The password to hash
 * @param salt The salt to use
 * @returns The hashed password
 */
export function hashPassword(password: string, salt: string): string {
  if (salt.length !== SALT_LENGTH) {
    throw new Error(`Invalid salt length: expected ${SALT_LENGTH}, got ${salt.length}`);
  }

  return salt + sha256(salt + password);
}

/**
 * Represents a payload of a login request.
 * 
 * This class can be used in both the client and server sides. For persistent authorization state,
 * use {@link Authorization} instead.
 */
export class LoginPayload {
  /** The username in the payload */
  public readonly username: string;

  /** The password in the payload */
  public readonly password: string;

  /** Construct a new {@link LoginPayload} object */
  public constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  /**
   * Hash the underlying password using a provided salt.
   * 
   * @param salt The salt to use
   * @returns The hashed password
   * @see {@link hashPassword}
   */
  public passwordHashed(salt: string): string {
    return hashPassword(this.password, salt);
  }

  /**
   * Construct HTTP headers containing the authorization data of this payload.
   * 
   * @returns The payload as a {@link Headers} object
   */
  public toHeaders(): Headers {
    const headers = new Headers();
    headers.set("Auth-Username", this.username);
    headers.set("Auth-Password", this.password);
    return headers;
  }

  /**
   * Construct a {@link LoginPayload} object from the provided JSON.
   * 
   * @param data The JSON data
   * @returns The payload as a {@link LoginPayload} object
   */
  public static fromJson(data: any): LoginPayload {
    const username = convertString(data.username);
    const password = convertString(data.password);

    return new LoginPayload(username, password);
  }

  /**
   * Construct a {@link LoginPayload} object from the provided HTTP headers.
   * 
   * @param headers The HTTP headers
   * @returns The payload as a {@link LoginPayload} object
   */
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

  /**
   * Construct a {@link LoginPayload} object from the singleton {@link Authorization} object.
   * 
   * @returns The payload as a {@link LoginPayload} object
   */
  public static fromSessionStorage(): LoginPayload {
    const authorization = Authorization.instance;
    if (!authorization.hasData) {
      throw new Error("Not logged in");
    }

    return new LoginPayload(authorization.username!, authorization.password!);
  }
}

/**
 * Represents a row in the SQL database containing authorization data.
 */
export class LoginPayloadRow {
  /** The username */
  public readonly name: string;

  /** The SHA-256 hashed string of salt + password */
  public readonly passwordHashed: string;

  /** The password salt */
  public readonly salt: string;

  private constructor(name: string, passwordHashed: string) {
    this.name = name;
    this.passwordHashed = passwordHashed.substring(8);
    this.salt = passwordHashed.substring(0, 8);
  }

  /**
   * Validate a {@link LoginPayload} object.
   * 
   * @param payload The payload to validate
   * @returns Whether the login payload has correct information
   */
  public validate(payload: LoginPayload): boolean {
    return payload.username === this.name && payload.passwordHashed(this.salt) === this.salt + this.passwordHashed;
  }

  /**
   * Construct a new {@link LoginPayloadRow} object from a database row.
   * 
   * @param data The database row
   * @returns A new {@link LoginPayloadRow} object
   */
  public static fromRow(data: any): LoginPayloadRow {
    const name = convertString(data.name);
    const passwordHashed = convertString(data.password_hashed);

    return new LoginPayloadRow(name, passwordHashed);
  }

  /**
   * Construct an array of {@link LoginPayloadRow} objects from a database query result.
   * 
   * @param rows The database query result
   * @returns An array of {@link LoginPayloadRow} objects
   */
  public static fromRows(rows: QueryResult<any>): Array<LoginPayloadRow> {
    return rows.rows.map((row) => LoginPayloadRow.fromRow(row));
  }
}
