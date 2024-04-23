import React from "react";
import { Metadata } from "next";

import "@/public/static/css/pages.css";

export const metadata: Metadata = {
  title: "Về chúng tôi | Công ty Viễn Đông"
}

export default function Home(): React.JSX.Element {
  return (
    <div className="page-section">
      <div className="intro-section">
        <div className="header-1">
        </div>
      </div>
    </div>
  );
}
