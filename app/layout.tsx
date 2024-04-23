"use client";

import Link from "next/link";
import React from "react";
import { Open_Sans } from "next/font/google";

import "@/public/static/css/layout.css";

const font = Open_Sans({ subsets: ["vietnamese"], weight: "400" });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  const [mobileMenuDisplay, setMobileMenuDisplay] = React.useState(false);

  const menuList = (
    <ul className="navigator-menu">
      <li>
        <Link href="/tourism">
          <span>Du lịch</span>
        </Link>
      </li>
      <li>
        <Link href="/construction">
          <span>Xây dựng</span>
        </Link>
      </li>
      <li>
        <Link href="/trade">
          <span>Thương mại</span>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <span>Về chúng tôi</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="Vien Dong, Viễn Đông, viendongcentral, Vien Dong Central" />
        <meta name="description" content="Công ty Cổ phần Viễn Đông Central" />
        <meta name="author" content="Nguyen Huy Liem" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      </head>
      <body className={font.className}>
        <div id="main-header">
          <div className="upper">
            <div className="hotline">
              <span>Hotline: <strong>1900xxxx</strong></span>
            </div>
            <div className="menu">
              <ul className="navigator-menu">
                <li>
                  <Link href="/">
                    <span className="material-icons">corporate_fare</span>
                    <span>Hệ thống giao dịch</span>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <span className="material-icons">manage_accounts</span>
                    <span>Đăng ký đại lý</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="lower">
            <Link href="/">
              <img alt="logo" className="logo" src="/static/images/viendong_logo.jpg" />
            </Link>
            <div className="menu hide-on-mobile">
              {menuList}
            </div>
            <span
              className="hide-on-desktop material-icons menu-button"
              onClick={() => setMobileMenuDisplay(!mobileMenuDisplay)}>
              {mobileMenuDisplay ? "close" : "menu"}
            </span>
          </div>
        </div>
        <div id="main">
          {mobileMenuDisplay ? menuList : children}
        </div>
        <div id="copyright-footer">
          <p>© 2021-2024 Công ty Cổ phần Viễn Đông Central</p>
          <p>Giám đốc: Nguyễn Huy Liêm</p>
          <p>SĐT: 0862590591</p>
          <p>MST: 0109495463</p>
          <p>
            Địa chỉ: Tầng 10, Tòa Nhà Sông Đà 9, Đường Nguyễn Hoàng, Phường Mỹ Đình 2,
            Quận Nam Từ Liêm, Thành phố Hà Nội, Việt Nam
          </p>
        </div>
      </body>
    </html >
  );
}
