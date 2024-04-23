import React from "react";
import { Metadata } from "next";
import { createDarkenBackground } from "../_lib/utils";

import "@/public/static/css/pages.css";

export const metadata: Metadata = {
  title: "Vận tải | Công ty Viễn Đông"
}

export default function Home(): React.JSX.Element {
  return (
    <div className="page-section" style={{ backgroundImage: createDarkenBackground("/static/images/transportation-5.jpg") }}>
      <div className="intro-section">
        <div className="header-1">
          <h1>Dịch vụ vận tải uy tín, chuyên nghiệp</h1>

          Bạn đang tìm kiếm dịch vụ vận tải an toàn, nhanh chóng và tiết kiệm? Hãy đến với Viễn Đông!
          Chúng tôi là công ty vận tải hàng đầu với nhiều năm kinh nghiệm trong lĩnh vực vận chuyển hàng hóa bằng đường bộ,
          đường hàng không, đường thủy và đường bộ quốc tế.
        </div>
      </div>
    </div>
  );
}
