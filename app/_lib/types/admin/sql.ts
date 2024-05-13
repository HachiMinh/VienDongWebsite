import { JSONFormatError } from "../../errors";

export class SQLQuery {
  public readonly query: string;

  public constructor(query: string) {
    this.query = query;
  }

  public static fromJson(data: any): SQLQuery {
    if (typeof (data.query) !== "string") {
      throw new JSONFormatError("No \"query\" field");
    }

    return new SQLQuery(data.query);
  }
}