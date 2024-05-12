"use client";

import Link from "next/link";
import React from "react";

import Tour from "../../types/tourism/tours";

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

export default function TourItem({ tour }: Readonly<{ tour: Tour }>): React.JSX.Element {
  return (
    <Link className="tour-item" href={`/tourism/${tour.id}`}>
      <div className="banner">
        <img alt="banner" className="banner-image" src={tour.imageSrc} />
      </div>
      <div className="tour-info">
        <h3>{tour.title}</h3>
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
        <span className="tour-cost">
          {`${slapCommasToThisNumber(tour.vndCost)} đ`}
        </span>
      </div>
    </Link>
  );
}
