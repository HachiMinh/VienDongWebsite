"use client";

import React, { useEffect } from "react";

import Tour from "../types/tourism/tour";
import TourList from "./TourList";

export default function InlandTours(): React.JSX.Element {
  const [tours, setTours] = React.useState<Tour[] | null>(null);

  useEffect(
    () => {
      if (tours === null) {
        fetch("/api/tourism/inland/tours", { method: "GET" })
          .then(
            async (response) => {
              const data = await response.json() as Array<any>;
              const result: Tour[] = [];
              data.forEach((d) => result.push(Tour.fromObject(d)));
              setTours(result);
            },
          )
      }
    },
  );

  return (
    <>
      <h1>Tour nội địa</h1>
      {tours === null ? undefined : <TourList items={tours.map((tour) => tour.toElement())} />}
    </>
  );
}
