"use client";

import React from "react";

import Tour from "../../types/tourism/tours";

import "@/public/static/css/tourism/tour-list.css";

export default function TourList(
  {
    id,
    international,
  }: Readonly<{
    id?: number,
    international?: boolean,
  }>): React.JSX.Element {
  const [tours, setTours] = React.useState<Array<Tour> | null>(null);
  const [fetching, setFetching] = React.useState(false);

  React.useEffect(
    () => {
      if (tours === null && !fetching) {
        setFetching(true);

        let url = "/api/tourism/tours?";
        if (id !== undefined) {
          url += `id=${id}&`;
        }
        if (international !== undefined) {
          url += `international=${international}&`;
        }

        fetch(url, { method: "GET" })
          .then(
            async (response) => {
              if (response.status !== 200) {
                return;
              }

              const data = await response.json() as Array<any>;
              const result: Array<Tour> = [];
              data.forEach((d) => result.push(Tour.fromJson(d)));
              setTours(result);
              setFetching(false);
            },
          );
      }
    },
    [],
  );

  return tours === null || tours.length === 0
    ? <></>
    : <div className="tour-list">{tours.map((tour) => tour.toElement())}</div>;
}
