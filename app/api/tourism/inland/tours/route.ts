import { NextRequest, NextResponse } from "next/server";

import Tour from "@/app/_lib/types/tourism/tour";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const tours: Tour[] = [];
  for (let i = 0; i < 10; i++) {
    tours.push(
      new Tour(
        i,
        "/static/images/home_placeholder.jpg",
        `Sample tour ${i}`,
        "Sample schedule",
        "Sample departure",
        0,
        999999999,
      ),
    );
  }

  return NextResponse.json(tours);
}
