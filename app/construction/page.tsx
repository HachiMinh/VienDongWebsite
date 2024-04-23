import React from "react";
import { Metadata } from "next";
import { createDarkenBackground } from "../_lib/utils";

import "@/public/static/css/pages.css";

export const metadata: Metadata = {
  title: "Xây dựng | Công ty Viễn Đông"
}

export default function Home(): React.JSX.Element {
  return (
    <div className="page-section" style={{ backgroundImage: createDarkenBackground("/static/images/construction-1.jpg") }}>
      <div className="intro-section">
        <div className="header-1">
          <h1>Nền tảng vững chắc cho mọi công trình</h1>

          Ngành Xây dựng của Công ty Viễn Đông tự hào là một trong những mũi nhọn chiến lược, đóng góp tiên phong vào sự phát triển chung của doanh nghiệp.
          Chúng tôi sở hữu đội ngũ cán bộ, kỹ sư, công nhân viên dày dặn kinh nghiệm, được đào tạo bài bản, cùng hệ thống trang thiết bị hiện đại, đáp ứng mọi yêu
          cầu khắt khe nhất từ phía quý khách hàng.
        </div>
      </div>
    </div>
  );
}
