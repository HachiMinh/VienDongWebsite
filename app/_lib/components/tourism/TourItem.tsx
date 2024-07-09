"use client";

import Link from "next/link";
import React from "react";
import { Card } from "react-bootstrap";

import Tour from "../../types/tours";
import { splitDigits } from "../../utils";

import "@/public/static/css/tour-item.css";

export default function TourItem({ tour }: Readonly<{ tour: Tour }>): React.JSX.Element {
  return (
    <Link className="tour-item" href={tour.href}>
      <Card>
        <Card.Img src={tour.imageSrc} variant="top" />
        <Card.Body>
          <Card.Title>{tour.title}</Card.Title>
          <Card.Text>
            <span className="material-icons">schedule</span>
            <b>Lịch trình: </b>{`${tour.days} ngày`}
            <br />
            <span className="material-icons">departure_board</span>
            <b>Khởi hành: </b>{`${tour.departure.toLocaleDateString("vi-VN")}`}
            <br />
            <span className="material-icons">person</span>
            <b>Số chỗ còn nhận: </b>{`${tour.slots}`}
            <br />
            <span className="text-danger">{`${splitDigits(tour.vndCost)} đ`}</span>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
