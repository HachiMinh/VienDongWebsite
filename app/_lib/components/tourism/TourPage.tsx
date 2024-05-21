"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Tour from "../../types/tourism/tours";
import TourList from "./TourList";

import "@/public/static/css/pages.css";
import "@/public/static/css/tourism.css";
import "@/public/static/css/tourism/tour-info.css";
import "@/public/static/css/tourism/tour-page.css";

export default function TourPage({ tourId }: Readonly<{ tourId: string }>): React.JSX.Element {
  const router = useRouter();
  const [header, setHeader] = React.useState(<h1>Loading tour.data...</h1>);
  const [tourBody, setTourBody] = React.useState(<></>);

  React.useEffect(
    () => {
      fetch(`/api/tourism/tours?id=${tourId}`, { method: "GET" }).then(
        async (response) => {
          const tours: Array<Tour> = [];
          if (response.status === 200) {
            const data = await response.json() as Array<any>;
            data.forEach((d) => tours.push(Tour.fromJson(d)));
          }

          if (tours.length === 0) {
            router.push("/not-found");
          } else {
            const tour = tours[0];
            setHeader(<h1 className="tour-title">{tour.data.title}</h1>);
            setTourBody(
              <div className="tour-body">
                <div className="banner">
                  <img className="tour-image" src={tour.data.imageSrc} />
                </div>
                <div className="tour-info">
                  <h1>{tour.data.title}</h1>
                  <p className="tour-schedule">
                    <span className="material-icons">schedule</span>
                    <b>Lịch trình: </b>{`${tour.data.days} ngày`}
                  </p>
                  <p className="tour-departure">
                    <span className="material-icons">departure_board</span>
                    <b>Khởi hành: </b>{`${tour.data.departure.toLocaleDateString("vi-VN")}`}
                  </p>
                  <p className="tour-slots">
                    <span className="material-icons">person</span>
                    <b>Số chỗ còn nhận: </b>{`${tour.data.slots}`}
                  </p>
                  <p className="tour-route">
                    <span className="material-icons">place</span>
                    <b>Lộ trình: </b>{`${tour.data.start} - ${tour.data.destination}`}
                  </p>
                  <p className="tour-description">
                    <span className="material-icons">description</span>
                    <b>Chi tiết: </b>{tour.data.description}
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
      <div className="page-header tourism">
        <div className="intro-section">
          <div className="header-1" >
            {header}
          </div>
        </div>
      </div>
      <div className="page-content tourism">
        {tourBody}
        <h1>Tour nội địa</h1>
        <TourList international={false} />
        <h1>Tour quốc tế</h1>
        <TourList international={true} />
      </div>
    </>
  );
}
