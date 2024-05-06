import React from "react";

import "@/public/static/css/tourism.css";

export default function TourList(
  {
    items,
  }: Readonly<{
    items: React.JSX.Element[],
  }>): React.JSX.Element {
  return (
    <div className="tour-list">
      {items}
    </div>
  );
}
