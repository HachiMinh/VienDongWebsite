"use client";

import Link from "next/link";
import React from "react";
import { Open_Sans } from "next/font/google";

import "@/public/static/css/layout.css";

const openSans = Open_Sans({ subsets: ["vietnamese"], weight: "400" });

enum MenuListPlatform {
  desktop,
  mobile,
}

export function MenuList({
  platform,
  callback,
}: Readonly<{
  platform: MenuListPlatform,
  callback: React.MouseEventHandler<HTMLAnchorElement> | undefined,
}>): React.JSX.Element {
  const spanClassName = (platform == MenuListPlatform.mobile) ? "horizontal-center" : undefined;
  return (
    <ul className="navigator-menu">
      <Link href="/construction" onClick={callback}>
        <li>
          <span className={spanClassName}>Xây dựng</span>
        </li>
      </Link>
      <Link href="/commercial" onClick={callback}>
        <li>
          <span className={spanClassName}>Thương mại</span>
        </li>
      </Link>
      <Link href="/tourism" onClick={callback}>
        <li>
          <span className={spanClassName}>Du lịch</span>
        </li>
      </Link>
      <Link href="/transportation" onClick={callback}>
        <li>
          <span className={spanClassName}>Vận tải</span>
        </li>
      </Link>
      <Link href="/about" onClick={callback}>
        <li>
          <span className={spanClassName}>Về chúng tôi</span>
        </li>
      </Link>
    </ul>
  );

}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  const [mobileMenuDisplay, setMobileMenuDisplay] = React.useState(false);

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
      <body className={openSans.className}
        style={mobileMenuDisplay ? {
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        } : undefined}>
        <div id="main-header">
          <div className="upper">
            <div className="hotline">
              <span>Hotline: <strong>1900xxxx</strong></span>
            </div>
            <div className="menu">
              <ul className="navigator-menu">
                <li>
                  <Link href="/" onClick={() => setMobileMenuDisplay(false)}>
                    <span className="material-icons">corporate_fare</span>
                    <span>Hệ thống giao dịch</span>
                  </Link>
                </li>
                <li>
                  <Link href="/" onClick={() => setMobileMenuDisplay(false)}>
                    <span className="material-icons">manage_accounts</span>
                    <span>Đăng ký đại lý</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="lower">
            <Link href="/" onClick={() => setMobileMenuDisplay(false)}>
              <img alt="logo" className="logo" src="/static/images/viendong_logo.jpg" />
            </Link>
            <div className="menu hide-on-mobile">
              <MenuList platform={MenuListPlatform.desktop} callback={() => setMobileMenuDisplay(false)} />
            </div>
            <span
              className="hide-on-desktop material-icons menu-button horizontal-center"
              onClick={() => setMobileMenuDisplay(!mobileMenuDisplay)}>
              {mobileMenuDisplay ? "close" : "menu"}
            </span>
          </div>
        </div>
        <div id="main" style={mobileMenuDisplay ? { flex: 1 } : undefined}>
          {mobileMenuDisplay
            ? <MenuList platform={MenuListPlatform.mobile} callback={() => setMobileMenuDisplay(false)} />
            : children}
        </div>
        <div id="copyright-footer">
          <div className="flex-left">
            <p>© 2021-2024 Công ty Cổ phần Viễn Đông Central</p>
            <p>Giám đốc: Nguyễn Huy Liêm</p>
            <p>SĐT: 0862590591</p>
            <p>MST: 0109495463</p>
            <p>
              Địa chỉ: Tầng 10, Tòa Nhà Sông Đà 9, Đường Nguyễn Hoàng, Phường Mỹ Đình 2,
              Quận Nam Từ Liêm, Thành phố Hà Nội, Việt Nam
            </p>
          </div>
          <div className="flex-right">
            <Link className="github-link" href="https://github.com/HachiMinh/VienDongWebsite" target="_blank">
              <img alt="GitHub logo" className="github-logo" src="/static/images/github-mark-white.png" />
            </Link>
          </div>
        </div>
      </body>
    </html >
  );
}
