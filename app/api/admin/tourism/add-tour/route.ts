import { NextRequest, NextResponse } from "next/server";

import Database from "@/app/_lib/server/database";
import Tour, { TourData } from "@/app/_lib/types/tourism/tours";
import authenticate, { AuthenticationStatus } from "@/app/_lib/server/authenticate";
import { ConversionError } from "@/app/_lib/errors";
import { HTTPBadRequest, HTTPForbidden, HTTPInternalServerError, HTTPOK } from "@/app/_lib/types/responses";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const result = await authenticate(request);
  switch (result.status) {
    case AuthenticationStatus.SUCCESS:
      try {
        const data = TourData.fromJson(await request.json());
        const queryResult = await Database.instance.query(
          `INSERT INTO tours (image_src, title, days, departure, slots, vnd_cost, start, destination, international, description)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING *`,
          [
            data.imageSrc, data.title, data.days, data.departure, data.slots, data.vndCost,
            data.start, data.destination, data.international, data.description,
          ],
        );

        const tour = Tour.fromRows(queryResult)[0];
        return new HTTPOK(JSON.stringify(tour));
      } catch (e: any) {
        if (e instanceof ConversionError) {
          return new HTTPBadRequest(e.message);
        }

        console.error(e);
        return new HTTPInternalServerError(e);
      }
    case AuthenticationStatus.FAILURE:
      return new HTTPForbidden();
    case AuthenticationStatus.SERVER_ERROR:
      return new HTTPInternalServerError();
  }
}