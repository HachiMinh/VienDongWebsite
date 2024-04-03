import React from "react";

import { Metadata } from "next";

import "@/public/static/css/home.css";

export const metadata: Metadata = {
  title: "Trang chủ | Công ty Viễn Đông"
}

function SectionsContent(
  {
    icon,
    title,
    subtitle,
  }: Readonly<{
    icon: String,
    title: String,
    subtitle: String,
  }>): JSX.Element {
  return (
    <div className="content">
      <div className="icon">
        <span className="material-icons">{icon}</span>
      </div>
      <div className="text">
        <div className="t1">{title}</div>
        <div className="t2">{subtitle}</div>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  return (
    <div id="home">
      <div className="sections-1">
        <div className="sections-1-a">
          <SectionsContent
            icon="handyman"
            title="Xây dựng"
            subtitle="CÔNG TRÌNH" />
        </div>
        <div className="sections-1-b">
          <SectionsContent
            icon="conveyor_belt"
            title="Phân phối"
            subtitle="SẢN PHẨM" />
        </div>
        <div className="sections-1-c">
          <SectionsContent
            icon="flight_takeoff"
            title="Dịch vụ"
            subtitle="DU LỊCH" />
        </div>
        <div className="sections-1-d">
          <SectionsContent
            icon="local_shipping"
            title="Dịch vụ"
            subtitle="Vận tải" />
        </div>
      </div>
    </div>
  );
}
