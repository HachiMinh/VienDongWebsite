import { LoginPayload } from "../types/admin/login";

/**
 * Singleton class for managing user authorization state.
 * 
 * Client-side only.
 */
export default class Authorization {
  private _username: string | null = null;
  private _password: string | null = null;

  private constructor() {
    if (window === undefined) {
      throw new Error("Authorization cannot be used in a server component");
    }
  }

  /** Whether there is underlying login data */
  public get hasData(): boolean {
    return this._username !== null && this._password !== null;
  }

  /** Validate the underlying login data */
  public async validate(): Promise<boolean> {
    const username = this._username;
    const password = this._password;
    if (username !== null && password !== null) {
      const data = new LoginPayload(username, password);
      const response = await fetch(
        "/api/admin/login",
        {
          method: "POST",
          headers: data.toHeaders(),
        },
      );

      return response.status === 200;
    }

    return false;
  }

  /** The username of the logged-in user, or null if not logged in */
  public get username(): string | null {
    return this._username;
  }

  /** The password of the logged-in user, or null if not logged in */
  public get password(): string | null {
    return this._password;
  }

  /**
   * Set the authorization state as "logged in" and save data to session storage
   * @param data The login data to store
   */
  public login(data: Readonly<LoginPayload>): void {
    this._username = data.username;
    this._password = data.password;
    sessionStorage.setItem("username", data.username);
    sessionStorage.setItem("password", data.password);
  }

  /** Clear authorization data (including data in session storage) */
  public logout(): void {
    this._username = null;
    this._password = null;
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
  }

  private static _instance: Authorization | null = null;

  /** Get the singleton instance of this class */
  public static get instance(): Authorization {
    if (this._instance === null) {
      this._instance = new this();
    }
    return this._instance;
  }
}
