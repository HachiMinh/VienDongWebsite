import { Mutex } from "async-mutex";
import { QueryResult, VercelPoolClient, db } from "@vercel/postgres";

export default class Database {
  private static _instance: Database | null = null;

  public static get instance(): Database {
    if (this._instance === null) {
      this._instance = new Database();
    }

    return this._instance;
  }

  private _pool: VercelPoolClient | null = null;
  private readonly _poolLock: Mutex = new Mutex();

  private _initialized: boolean = false;
  private readonly _initializeLock: Mutex = new Mutex();

  private constructor() {
    try {
      if (window !== undefined) {
        throw new Error("Database cannot be used in a client component");
      }
    } catch (e: any) {
      if (e instanceof ReferenceError) {
        // pass
      } else {
        throw e;
      }
    }
  }

  private async _getPool(): Promise<VercelPoolClient> {
    return await this._poolLock.runExclusive(
      async () => {
        if (this._pool === null) {
          this._pool = await db.connect();
        }

        return this._pool;
      },
    );
  }

  private async _initialize(): Promise<void> {
    await this._initializeLock.runExclusive(
      async () => {
        if (!this._initialized) {
          const pool = await this._getPool();
          await pool.query("CREATE TABLE IF NOT EXISTS admin (name text primary key, password_hashed text)");
          await pool.query(`
            INSERT INTO admin (name, password_hashed)
            VALUES ('admin', '4a7a891eea46056c63820a6c6d90c6cc185d7ed1e7ad89976fb415751a534d0e')
            ON CONFLICT DO NOTHING
          `);
          this._initialized = true;
        }
      },
    );
  }

  private async checkInitialize(): Promise<void> {
    if (!this._initialized) {
      await this._initialize();
    }
  }

  public async query(text: string, values?: any[]): Promise<QueryResult<any>> {
    await this.checkInitialize();

    // TODO: Implement rate-limit
    const pool = await this._getPool();
    return await pool.query(text, values);
  }
}
