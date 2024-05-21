"use client";

import Link from "next/link";
import React from "react";

import Tour, { TourData } from "../../types/tourism/tours";

import "@/public/static/css/tourism/tour-info.css";
import "@/public/static/css/tourism/tour-item.css";

function slapCommasToThisNumber(number: number): string {
  const parts = number.toString().split(".");
  const integerPart = parts[0] || "0";

  // Reverse the integer part for easier comma insertion
  const reversedInteger = integerPart.split("").reverse().join("");
  let formattedInteger = "";
  for (let i = 0; i < reversedInteger.length; i++) {
    if (i > 0 && i % 3 === 0) {
      formattedInteger += ",";
    }
    formattedInteger += reversedInteger[i];
  }

  // Reverse the formatted integer back to normal order
  let result = formattedInteger.split("").reverse().join("");

  const decimalPart = parts[1];
  if (decimalPart !== undefined) {
    result += `.${decimalPart}`;
  }

  return result;
}

export default function TourItem({ tour }: Readonly<{ tour: Tour | TourData }>): React.JSX.Element {
  const data = (tour instanceof TourData) ? tour : tour.data;
  const id = (tour instanceof Tour) ? tour.id : null;

  return (
    <Link className="tour-item" href={tour.href}>
      <div className="banner">
        <img alt="banner" className="banner-image" src={data.imageSrc} />
      </div>
      <div className="tour-info">
        <h3>{data.title}</h3>
        <p className="tour-schedule">
          <span className="material-icons">schedule</span>
          <b>Lịch trình: </b>{`${data.days} ngày`}
        </p>
        <p className="tour-departure">
          <span className="material-icons">departure_board</span>
          <b>Khởi hành: </b>{`${data.departure.toLocaleDateString("vi-VN")}`}
        </p>
        <p className="tour-slots">
          <span className="material-icons">person</span>
          <b>Số chỗ còn nhận: </b>{`${data.slots}`}
        </p>
        <span className="tour-cost">
          {`${slapCommasToThisNumber(data.vndCost)} đ`}
        </span>
      </div>
    </Link>
  );
}
