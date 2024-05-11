import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";

import "@/public/static/css/pages.css";
import "@/public/static/css/tourism.css";

export const metadata: Metadata = {
  title: "Đăng ký tour du lịch | Công ty Viễn Đông"
}

const TourPage = dynamic(() => import("@/app/_lib/components/tourism/TourPage"), { ssr: false });

export default function Home({ params }: Readonly<{ params: { tourId: string } }>): React.JSX.Element {
  return <TourPage tourId={params.tourId} />;
}
