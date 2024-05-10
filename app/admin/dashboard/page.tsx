import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";

import "@/public/static/css/pages.css";

export const metadata: Metadata = {
  title: "Administrator dashboard",
};

// https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr
const Redirect = dynamic(() => import("@/app/_lib/components/admin/login/Redirect"), { ssr: false });

export default function Home(): React.JSX.Element {
  return (
    <div className="page-section">
      <div className="intro-section">
        <div className="header-1" style={{ color: "black" }}>
          <Redirect />
        </div>
      </div>
    </div>
  );
}
