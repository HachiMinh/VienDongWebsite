import fs from "fs";
import sqlite3 from "sqlite3";
import { Mutex } from "async-mutex";
import { Database, open } from "sqlite";

export default class BackendDatabase {
  public readonly connection: Database<sqlite3.Database, sqlite3.Statement>;

  private constructor(connection: Database<sqlite3.Database, sqlite3.Statement>) {
    this.connection = connection;
  }

  private static _instance: BackendDatabase | undefined;
  private static readonly _initializeLock = new Mutex();
  public static async getInstance(): Promise<BackendDatabase> {
    if (this._instance === undefined) {
      await this._initializeLock.runExclusive(
        async () => {
          if (!fs.existsSync("secrets/")) {
            fs.mkdirSync("secrets/");
          }

          const requireInitialization = !fs.existsSync("secrets/database.db");
          const database = await open(
            {
              filename: "./secrets/database.db",
              driver: sqlite3.cached.Database,
              mode: sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
            },
          );

          if (requireInitialization) {
            await database.run("CREATE TABLE admin_users (user TEXT PRIMARY KEY, passwordHashed TEXT)");
            await database.run("INSERT INTO admin_users VALUES (?, ?)", "admin", "4a7a891eea46056c63820a6c6d90c6cc185d7ed1e7ad89976fb415751a534d0e");
          }

          this._instance = new this(database);
        },
      );
    }

    return this._instance as BackendDatabase;
  }
}