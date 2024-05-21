import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";

import "@/public/static/css/pages.css";
import "@/public/static/css/tourism.css";

export const metadata: Metadata = {
  title: "Du lịch | Công ty Viễn Đông"
}

const TourList = dynamic(() => import("@/app/_lib/components/tourism/TourList"), { ssr: false });

export default function Home(): React.JSX.Element {
  return (
    <>
      <div className="page-header tourism">
        <div className="intro-section">
          <div className="header-1">
            <h1>Khám phá thế giới cùng bạn!</h1>

            Công ty Viễn Đông tự hào là một trong những doanh nghiệp hàng đầu trong lĩnh vực du lịch tại Việt Nam.
            Với nhiều năm hoạt động, chúng tôi đã và đang không ngừng nỗ lực mang đến cho khách hàng
            những dịch vụ du lịch chất lượng cao, đáp ứng mọi nhu cầu đa dạng của du khách.
          </div>
        </div>
      </div>
      <div className="page-content tourism">
        <h1>Tour nội địa</h1>
        <TourList international={false} />
        <h1>Tour quốc tế</h1>
        <TourList international={true} />
      </div>
    </>
  );
}
