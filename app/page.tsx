import Link from "next/link";
import React from "react";
import { Metadata } from "next";

import "@/public/static/css/root.css";

export const metadata: Metadata = {
  title: "Trang chủ | Công ty Viễn Đông"
}

function SectionsContent(
  {
    href,
    icon,
    title,
    subtitle,
  }: Readonly<{
    href: string,
    icon: string,
    title: string,
    subtitle: string,
  }>): React.JSX.Element {
  return (
    <Link className="content" href={href}>
      <div className="icon">
        <span className="material-icons">{icon}</span>
      </div>
      <div className="text">
        <div className="t1">{title}</div>
        <div className="t2">{subtitle}</div>
      </div>
    </Link>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <div id="home">
      <div className="sections-1">
        <div className="sections-1-a">
          <SectionsContent
            href="/construction"
            icon="handyman"
            title="Dịch vụ"
            subtitle="XÂY DỰNG" />
        </div>
        <div className="sections-1-b">
          <SectionsContent
            href="/commercial"
            icon="conveyor_belt"
            title="Dịch vụ"
            subtitle="THƯƠNG MẠI" />
        </div>
        <div className="sections-1-c">
          <SectionsContent
            href="/tourism"
            icon="flight_takeoff"
            title="Dịch vụ"
            subtitle="DU LỊCH" />
        </div>
        <div className="sections-1-d">
          <SectionsContent
            href="/transportation"
            icon="local_shipping"
            title="Dịch vụ"
            subtitle="VẬN TẢI" />
        </div>
      </div>
    </div>
  );
}
