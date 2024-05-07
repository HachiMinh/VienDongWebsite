"use client";

import React from "react";

import Tour from "../types/tourism/tour";
import TourList from "./TourList";

export default function InlandTours(): React.JSX.Element {
  const [tours, setTours] = React.useState<Tour[] | null>(null);
  const [fetching, setFetching] = React.useState(false);

  React.useEffect(
    () => {
      if (tours === null && !fetching) {
        setFetching(true);
        fetch("/api/tourism/international/tours", { method: "GET" })
          .then(
            async (response) => {
              const data = await response.json() as Array<any>;
              const result: Tour[] = [];
              data.forEach((d) => result.push(Tour.fromObject(d)));
              setTours(result);
              setFetching(false);
            },
          );
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
