import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";

import "@/public/static/css/pages.css";
import "@/public/static/css/tourism.css";

export const metadata: Metadata = {
  title: "Đăng ký tour du lịch | Công ty Viễn Đông"
}

const InlandTours = dynamic(() => import("@/app/_lib/components/tourism/InlandTours"), { ssr: false });
const InternationalTours = dynamic(() => import("@/app/_lib/components/tourism/InternationalTours"), { ssr: false });

export default function Home({ params }: Readonly<{ params: { tourId: string } }>): React.JSX.Element {
  return (
    <>
      <div className="page-section tourism">
        <div className="intro-section">
          <div className="header-1" >
            <h1>Tour {params.tourId}</h1>
          </div>
        </div>
      </div>
      <div className="page-content tourism">
        <InlandTours />
        <InternationalTours />
      </div>
    </>
  );
}
