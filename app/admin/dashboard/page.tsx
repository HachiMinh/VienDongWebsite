import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";

import "@/public/static/css/pages.css";

export const metadata: Metadata = {
  title: "Administrator dashboard",
};

// https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr
const DynamicRedirect = dynamic(() => import("@/app/_lib/components/Redirect"), { ssr: false });

export default function Home(): React.JSX.Element {
  return (
    <div className="page-section">
      <div className="intro-section">
        <div className="header-1" style={{ color: "black" }}>
          <DynamicRedirect />
        </div>
      </div>
    </div>
  );
}
