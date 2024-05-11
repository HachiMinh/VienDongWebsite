"use client";

import React from "react";
import { useRouter } from "next/navigation";

import InlandTours from "./InlandTours";
import InternationalTours from "./InternationalTours";
import Tour from "../../types/tourism/tours";

import "@/public/static/css/pages.css";
import "@/public/static/css/tourism.css";

export default function TourPage({ tourId }: Readonly<{ tourId: string }>): React.JSX.Element {
  const router = useRouter();
  const [header, setHeader] = React.useState(<h1>Loading tour...</h1>);
  const [tourBody, setTourBody] = React.useState(<></>);

  React.useEffect(
    () => {
      fetch(`/api/tourism/tours?id=${tourId}`, { method: "GET" }).then(
        async (response) => {
          const data = await response.json() as Array<any>;
          const tours: Array<Tour> = [];
          data.forEach((d) => tours.push(Tour.fromJson(d)));

          if (tours.length === 0) {
            router.push("/not-found");
          } else {
            const tour = tours[0];
            setHeader(<h1 className="tour-title">{tour.title}</h1>);
            setTourBody(
              <div className="tour-body">
                <div className="banner">
                  <img className="tour-image" src={tour.imageSrc} />
                </div>
                <div className="tour-info">
                  <h1>{tour.title}</h1>
                  <p className="tour-schedule">
                    <span className="material-icons">schedule</span>
                    <b>Lịch trình: </b>{`${tour.days} ngày`}
                  </p>
                  <p className="tour-departure">
                    <span className="material-icons">departure_board</span>
                    <b>Khởi hành: </b>{`${tour.departure.toLocaleDateString("vi-VN")}`}
                  </p>
                  <p className="tour-slots">
                    <span className="material-icons">person</span>
                    <b>Số chỗ còn nhận: </b>{`${tour.slots}`}
                  </p>
                  <p className="tour-route">
                    <span className="material-icons">place</span>
                    <b>Lộ trình: </b>{`${tour.start} - ${tour.end}`}
                  </p>
                </div>
              </div>,
            );
          }
        },
      );
    },
    [],
  );

  return (
    <>
      <div className="page-section tourism">
        <div className="intro-section">
          <div className="header-1" >
            {header}
          </div>
        </div>
      </div>
      <div className="page-content tourism">
        {tourBody}
        <InlandTours />
        <InternationalTours />
      </div>
    </>
  );
}
