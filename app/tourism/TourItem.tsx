import React from "react";

import "@/public/static/css/tourism.css";

export default function TourItem(
  {
    image,
    title,
    schedule,
    departure,
    slots,
  }: Readonly<{
    image: string,
    title: string,
    schedule: string,
    departure: string,
    slots: string,
  }>
): React.JSX.Element {
  return (
    <div className="tour-item">
      <div className="banner">
        <img alt="banner" className="banner-image" src={image} />
      </div>
      <div className="tour-info">
        <h3 className="tour-title">{title}</h3>
        <p className="tour-schedule">
          <span className="material-icons">schedule</span>
          {`Lịch trình: ${schedule}`}
        </p>
        <p className="tour-departure">
          <span className="material-icons">departure_board</span>
          {`Khởi hành: ${departure}`}
        </p>
        <p className="tour-slots">
          <span className="material-icons">person</span>
          {`Số chỗ còn nhận: ${slots}`}
        </p>
      </div>
    </div>
  );
}
