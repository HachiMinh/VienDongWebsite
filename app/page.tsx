"use client";

import React from "react";
import { Carousel } from "react-bootstrap";
import { Varela_Round } from "next/font/google";

import "@/public/static/css/home-carousel.css";

const varelaRound = Varela_Round({ subsets: ["vietnamese"], weight: "400" });
const SLIDE_SHOW_INTERVAL_MILLISECONDS = 30000;

export default function Home(): React.JSX.Element {
  React.useEffect(() => {
    document.title = "Trang chủ | Công ty Viễn Đông";
  });

  return (
    <Carousel className={varelaRound.className} id="home-carousel">
      <Carousel.Item interval={SLIDE_SHOW_INTERVAL_MILLISECONDS}>
        <Carousel.Caption>
          <h3>Công ty Viễn Đông</h3>
          <p>
            <b>Công ty Viễn Đông</b> là công ty hoạt động đa ngành, chuyên cung cấp các
            sản phẩm và dịch vụ chất lượng cao cho khách hàng trong nhiều lĩnh vực khác nhau.
            Sứ mệnh của chúng tôi là mang đến cho khách hàng những trải nghiệm tốt nhất
            thông qua các sản phẩm và dịch vụ được đầu tư kỹ lưỡng, đáp ứng mọi nhu cầu của khách hàng.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={SLIDE_SHOW_INTERVAL_MILLISECONDS}>
        <Carousel.Caption>
          <h3>Sứ mệnh</h3>
          <p>Viễn Đông cam kết nâng tầm cuộc sống cho khách hàng bằng cách cung cấp sản phẩm và
            dịch vụ tối ưu. Chúng tôi tạo dựng môi trường làm việc chuyên nghiệp, năng động, khuyến
            khích sáng tạo và hợp tác để kết nối cộng đồng doanh nghiệp và lan tỏa giá trị tích cực
            đến xã hội. Hoạt động kinh doanh của Viễn Đông luôn hướng đến sự phát triển bền vững,
            tuân thủ pháp luật, đạo đức kinh doanh và bảo vệ môi trường.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={SLIDE_SHOW_INTERVAL_MILLISECONDS}>
        {/* Section is too long to display on mobile */}
        <Carousel.Caption className="d-none d-sm-block">
          <h3>Lĩnh vực hoạt động</h3>
          <ul>
            <li><b>Xây dựng:</b> Thi công nhà ở, công trình dân dụng & công nghiệp (chất lượng, an toàn, tiến độ).</li>
            <li><b>Bán buôn:</b> Cung cấp đa dạng vật liệu xây dựng, thiết bị, máy móc, hàng hóa (đáp ứng mọi nhu cầu).</li>
            <li><b>Vận tải:</b> Vận chuyển hành khách & hàng hóa bằng xe hiện đại (an toàn, đúng giờ).</li>
            <li><b>Dịch vụ:</b> Lưu trú, ăn uống, du lịch, cho thuê máy móc, thiết bị, xe cộ & hỗ trợ kinh doanh (trải nghiệm trọn vẹn).</li>
            <li><b>Xuất nhập khẩu:</b> Xuất nhập khẩu đa dạng mặt hàng (mở rộng thị trường, nâng cao năng lực cạnh tranh).</li>
            <li><b>Giải trí:</b> Cung cấp hoạt động vui chơi giải trí lành mạnh, bổ ích (thư giãn, nâng cao tinh thần).</li>
          </ul>
        </Carousel.Caption>
        {/* Mobile view */}
        <Carousel.Caption className="d-block d-sm-none">
          <h3>Lĩnh vực hoạt động</h3>
          <ul>
            <li>Xây dựng</li>
            <li>Bán buôn</li>
            <li>Vận tải</li>
            <li>Dịch vụ</li>
            <li>Xuất nhập khẩu</li>
            <li>Giải trí</li>
          </ul>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
