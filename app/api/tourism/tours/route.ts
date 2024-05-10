import { NextRequest, NextResponse } from "next/server";

import Tour from "@/app/_lib/types/tourism/tours";

export async function GET(request: NextRequest): Promise<NextResponse> {
  let tours: Array<Tour> = new Array<Tour>();
  for (let i = 0; i < 20; i++) {
    tours.push(
      new Tour({
        id: i,
        imageSrc: "/static/images/home_placeholder.jpg",
        title: `Sample tour ${i}`,
        days: 3,
        departure: new Date(Date.now()),
        slots: 0,
        vndCost: 999999999,
        start: "Astral Express",
        end: "Penacony",
        international: i % 2 == 0,
      }),
    );
  }

  const id = request.nextUrl.searchParams.get("id");
  if (id !== null) {
    tours = Array.from(tours).filter((tour) => tour.id.toString() === id);
  }

  const international = request.nextUrl.searchParams.get("international");
  if (international === "true") {
    tours = Array.from(tours).filter((tour) => tour.international);
  } else if (international === "false") {
    tours = Array.from(tours).filter((tour) => !tour.international);
  }

  return NextResponse.json(tours);
}
