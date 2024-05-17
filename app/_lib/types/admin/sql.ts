import { JSONFormatError } from "../../errors";

export class SQLQueryPayload {
  public readonly query: string;

  public constructor(query: string) {
    this.query = query;
  }

  public static fromJson(data: any): SQLQueryPayload {
    if (typeof (data.query) !== "string") {
      throw new JSONFormatError("No \"query\" field");
    }

    return new SQLQueryPayload(data.query);
  }
}
