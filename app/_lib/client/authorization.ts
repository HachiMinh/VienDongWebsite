import { LoginPayload } from "../types/admin/login";

export default class Authorization {
  private _username: string | undefined;
  private _password: string | undefined;

  private constructor() {
    if (window === undefined) {
      throw new Error("Authorization cannot be used in a server component");
    }
  }

  public get loggedIn(): boolean {
    return this._username !== undefined && this._password !== undefined;
  }

  public get username(): string | undefined {
    return this._username;
  }

  public get password(): string | undefined {
    return this._password;
  }

  public login(data: Readonly<LoginPayload>): void {
    this._username = data.username;
    this._password = data.password;
    sessionStorage.setItem("username", data.username);
    sessionStorage.setItem("password", data.password);
  }

  public logout(): void {
    this._username = undefined;
    this._password = undefined;
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
  }

  private static _instance: Authorization | undefined;
  public static get instance(): Authorization {
    if (this._instance === undefined) {
      this._instance = new this();
    }
    return this._instance;
  }
}
