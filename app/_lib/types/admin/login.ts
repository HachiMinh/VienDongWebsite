import { sha256 } from "js-sha256";

import { DatabaseFormatError, JSONFormatError } from "../../errors";

export class LoginPayload {
  public readonly username: string;
  public readonly password: string;
  public readonly passwordHashed: string;

  public constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
    this.passwordHashed = sha256(password);
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
}

export class LoginPayloadRow {
  public readonly name: string;
  public readonly passwordHashed: string;

  public constructor(name: string, passwordHashed: string) {
    this.name = name;
    this.passwordHashed = passwordHashed;
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
}
