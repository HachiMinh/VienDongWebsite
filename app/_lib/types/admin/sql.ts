import { convertString } from "../converters";

export class SQLQueryPayload {
  public readonly query: string;

  public constructor(query: string) {
    this.query = query;
  }

  public static fromJson(data: any): SQLQueryPayload {
    const query = convertString(data.query);
    return new SQLQueryPayload(query);
  }
}
