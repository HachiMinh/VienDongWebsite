export default class AuthorizationState {
  private _username: string | undefined;
  private _password: string | undefined;

  private constructor() {
    if (window === undefined) {
      throw new Error("AuthorizationState used in Server Component");
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

  public login(username: string, password: string): void {
    this._username = username;
    this._password = password;
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("password", password);
  }

  public logout(): void {
    this._username = undefined;
    this._password = undefined;
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
  }

  private static _instance: AuthorizationState | undefined;
  public static get instance(): AuthorizationState {
    if (this._instance === undefined) {
      this._instance = new this();
    }
    return this._instance;
  }
}
