import Link from "next/link";
import React from "react";
import { Varela_Round } from "next/font/google";
import { Metadata } from "next";

import "@/public/static/css/root.css";

export const metadata: Metadata = {
  title: "Trang chủ | Công ty Viễn Đông"
}

const varelaRound = Varela_Round({ subsets: ["vietnamese"], weight: "400" });

function SectionsContent(
  {
    href,
    icon,
    title,
    subtitle,
  }: Readonly<{
    href: string,
    icon: string,
    title: string,
    subtitle: string,
  }>): React.JSX.Element {
  return (
    <Link className="content" href={href}>
      <div className="icon">
        <span className="material-icons">{icon}</span>
      </div>
      <div className="text">
        <div className="t1">{title}</div>
        <div className="t2">{subtitle}</div>
      </div>
    </Link>
  );
}

export default function Home(): React.JSX.Element {
  return (
    <div id="home">
      <div className="sections-1">
        <div className="sections-1-a">
          <SectionsContent
            href="/construction"
            icon="handyman"
            title="Dịch vụ"
            subtitle="XÂY DỰNG" />
        </div>
        <div className="sections-1-b">
          <SectionsContent
            href="/commercial"
            icon="conveyor_belt"
            title="Dịch vụ"
            subtitle="THƯƠNG MẠI" />
        </div>
        <div className="sections-1-c">
          <SectionsContent
            href="/tourism"
            icon="flight_takeoff"
            title="Dịch vụ"
            subtitle="DU LỊCH" />
        </div>
        <div className="sections-1-d">
          <SectionsContent
            href="/transportation"
            icon="local_shipping"
            title="Dịch vụ"
            subtitle="VẬN TẢI" />
        </div>
      </div>

      <img alt="metropolitan"
        src="/static/images/metropolitan.jpg"
        style={{ width: "100%" }} />

      <div className="company intro-container">
        <div className={`header ${varelaRound.className}`}>
          <h1>Công ty Viễn Đông</h1>
        </div>
        <div className="content">
          <p>
            <b>Công ty Viễn Đông</b> là công ty hoạt động đa ngành, chuyên cung cấp các
            sản phẩm và dịch vụ chất lượng cao cho khách hàng trong nhiều lĩnh vực khác nhau.
            Sứ mệnh của chúng tôi là mang đến cho khách hàng những trải nghiệm tốt nhất
            thông qua các sản phẩm và dịch vụ được đầu tư kỹ lưỡng, đáp ứng mọi nhu cầu của khách hàng.
          </p>
        </div>
      </div>

      <div className="missions intro-container reverse animation">
        <div className={`header ${varelaRound.className}`}>
          <h1>Sứ mệnh</h1>
        </div>
        <div className="content">
          <ul>
            <li><b>Nâng tầm cuộc sống:</b> Không ngừng nỗ lực mang đến cho khách hàng những sản phẩm và dịch vụ tối ưu, góp phần nâng cao chất lượng cuộc sống cho mọi người.</li>
            <li><b>Kết nối cộng đồng:</b> Tạo dựng môi trường làm việc chuyên nghiệp, năng động, khuyến khích sự sáng tạo và hợp tác, từ đó kết nối cộng đồng doanh nghiệp và lan tỏa giá trị tích cực đến xã hội.</li>
            <li><b>Phát triển bền vững:</b> Hoạt động kinh doanh hiệu quả, tuân thủ các quy định pháp luật và đạo đức kinh doanh, đồng thời cam kết bảo vệ môi trường và phát triển bền vững.</li>
            <li><b>Kết nối cộng đồng:</b> Tạo dựng môi trường làm việc chuyên nghiệp, năng động, khuyến khích sự sáng tạo và hợp tác, từ đó kết nối cộng đồng doanh nghiệp và lan tỏa giá trị tích cực đến xã hội.</li>
          </ul>
        </div>
      </div>

      <div className="fields intro-container animation">
        <div className={`header ${varelaRound.className}`}>
          <h1>Lĩnh vực hoạt động</h1>
        </div>
        <div className="content">
          <ul>
            <li><b>Xây dựng:</b> Chuyên thi công xây dựng nhà ở, công trình dân dụng và công nghiệp, đảm bảo chất lượng, an toàn và tiến độ thi công.</li>
            <li><b>Bán buôn:</b> Cung cấp đa dạng các mặt hàng vật liệu xây dựng, thiết bị điện, máy móc, nông sản, thực phẩm, đồ uống, vải may, giày dép, nhiên liệu, kim loại, đáp ứng mọi nhu cầu của khách hàng.</li>
            <li><b>Vận tải:</b> Đáp ứng nhu cầu vận chuyển hành khách và hàng hóa bằng hệ thống xe buýt, xe khách hiện đại, đảm bảo an toàn và đúng giờ.</li>
            <li><b>Dịch vụ:</b> Mang đến các dịch vụ lưu trú, ăn uống, du lịch, cho thuê máy móc, thiết bị, xe cộ và các dịch vụ hỗ trợ kinh doanh khác, góp phần tạo dựng trải nghiệm trọn vẹn cho khách hàng.</li>
            <li><b>Xuất nhập khẩu:</b> Hoạt động xuất nhập khẩu đa dạng các mặt hàng, mở rộng thị trường và nâng cao năng lực cạnh tranh cho công ty.</li>
            <li><b>Giải trí:</b> Cung cấp các hoạt động vui chơi giải trí lành mạnh, bổ ích, góp phần thư giãn và nâng cao tinh thần cho khách hàng.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
