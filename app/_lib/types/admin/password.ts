import crypto from "crypto";

import { SALT_LENGTH, hashPassword } from "./login";
import { convertString } from "../converters";

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
    const oldPassword = convertString(data.oldPassword);
    const newPassword = convertString(data.newPassword);
    const confirmNewPassword = convertString(data.confirmNewPassword);

    return new ChangePasswordPayload(oldPassword, newPassword, confirmNewPassword);
  }
}
