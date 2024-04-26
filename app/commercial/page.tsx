import React from "react";
import { Metadata } from "next";

import { createDarkenBackground } from "@/app/_lib/utils";

import "@/public/static/css/pages.css";

export const metadata: Metadata = {
  title: "Phân phối | Công ty Viễn Đông"
}

export default function Home(): React.JSX.Element {
  return (
    <div className="page-section" style={{ backgroundImage: createDarkenBackground("/static/images/commercial-1.jpg") }}>
      <div className="intro-section">
        <div className="header-1">
          <h1>Cung cấp giải pháp thương mại toàn diện</h1>

          Bạn đang tìm kiếm đối tác uy tín để hợp tác trong lĩnh vực thương mại? Hãy đến với Viễn Đông Central!
          Chúng tôi là công ty thương mại hàng đầu với nhiều năm kinh nghiệm trong lĩnh vực xuất nhập khẩu, phân phối hàng hóa
          và cung cấp dịch vụ logistics.
        </div>
      </div>
    </div>
  );
}
