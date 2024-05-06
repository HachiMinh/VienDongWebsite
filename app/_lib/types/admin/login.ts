import { TypeCheckingException } from "../../errors";

export class LoginPayload {
  public readonly username: string;
  public readonly password: string;

  public constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  public static fromObject(data: any): LoginPayload {
    if (typeof (data.username) !== "string") {
      throw new TypeCheckingException("No \"username\" field");
    }
    if (typeof (data.password) !== "string") {
      throw new TypeCheckingException("No \"password\" field");
    }

    return new LoginPayload(data.username, data.password);
  }
}
