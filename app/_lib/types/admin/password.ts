import crypto from "crypto";

import { JSONFormatError } from "../../errors";
import { hashPassword } from "./login";

export class ChangePasswordPayload {
  public readonly oldPassword: string;
  public readonly newPassword: string;

  public constructor(oldPassword: string, newPassword: string) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }

  public hashNewPassword(): string {
    const salt = crypto.randomBytes(4).toString("hex");
    return hashPassword(this.newPassword, salt);
  }

  public static fromJson(data: any): ChangePasswordPayload {
    if (typeof (data.oldPassword) !== "string") {
      throw new JSONFormatError("No \"oldPassword\" field");
    }
    if (typeof (data.newPassword) !== "string") {
      throw new JSONFormatError("No \"newPassword\" field");
    }

    return new ChangePasswordPayload(data.oldPassword, data.newPassword);
  }
}
