import crypto from "crypto";

import { JSONFormatError } from "../../errors";
import { SALT_LENGTH, hashPassword } from "./login";

export class ChangePasswordPayload {
  public readonly oldPassword: string;
  public readonly newPassword: string;
  public readonly confirmNewPassword: string;

  public constructor(oldPassword: string, newPassword: string, confirmNewPassword: string) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
    this.confirmNewPassword = confirmNewPassword;
  }

  public match(): boolean {
    return this.newPassword === this.confirmNewPassword;
  }

  public hashNewPassword(): string {
    const salt = crypto.randomBytes(SALT_LENGTH / 2).toString("hex");
    return hashPassword(this.newPassword, salt);
  }

  public static fromJson(data: any): ChangePasswordPayload {
    if (typeof (data.oldPassword) !== "string") {
      throw new JSONFormatError("No \"oldPassword\" field");
    }
    if (typeof (data.newPassword) !== "string") {
      throw new JSONFormatError("No \"newPassword\" field");
    }
    if (typeof (data.confirmNewPassword) !== "string") {
      throw new JSONFormatError("No \"confirmNewPassword\" field");
    }

    return new ChangePasswordPayload(data.oldPassword, data.newPassword, data.confirmNewPassword);
  }
}
