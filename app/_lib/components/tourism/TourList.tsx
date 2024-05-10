"use client";

import React from "react";
import Tour from "../../types/tourism/tours";

export default function TourList({ items }: Readonly<{ items: Array<Tour> }>): React.JSX.Element {
  return (
    <div className="tour-list">
      {items.map((item) => item.toElement())}
    </div>
  );
}
