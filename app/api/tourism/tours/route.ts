import { NextRequest, NextResponse } from "next/server";

import Database from "@/app/_lib/server/database";
import Tour from "@/app/_lib/types/tourism/tours";

export async function GET(request: NextRequest): Promise<NextResponse> {
  let constraints: Array<string> = [];
  let constraintValues: Array<any> = [];

  const id = request.nextUrl.searchParams.get("id");
  if (id !== null) {
    constraints.push(`id = $${1 + constraints.length}`);
    constraintValues.push(id);
  }

  const internationalString = request.nextUrl.searchParams.get("international");
  const international = internationalString === "true" ? true : (internationalString === "false" ? false : null);
  if (international !== null) {
    constraints.push(`international = $${1 + constraints.length}`);
    constraintValues.push(international);
  }

  let query = "SELECT * FROM tours";
  if (constraints.length > 0) {
    query += ` WHERE ${constraints.join(" AND ")}`;
  }

  const queryResult = await Database.instance.query(query, constraintValues);
  const tours = Tour.fromRows(queryResult);

  return NextResponse.json(tours);
}
