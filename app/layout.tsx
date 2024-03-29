"use client";

import Link from "next/link";
import React from "react";
import { useState } from "react";
import { Open_Sans } from "next/font/google";

import "@/public/static/css/layout.css";

const font = Open_Sans({ subsets: ["vietnamese"], weight: "400" });
const titles = ["Trang chủ", "Section A", "Section B"];
const hrefs = ["/", "/a", "/b"];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="favicon.ico?v=2" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="Vien Dong, Viễn Đông, viendongcentral, Vien Dong Central" />
        <meta name="description" content="Công ty Cổ phần Viễn Đông Central" />
        <meta name="author" content="Nguyen Huy Liem" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      </head>
      <body className={font.className}>
        <header id="main-header">
          <div className="header-menu">
            <span className="material-icons" onClick={() => setOpenMenu(!openMenu)}>menu</span>
          </div>
          <Link className="header-signature" href="/">
            <img alt="logo" className="logo" src="/static/images/viendong_logo.jpg" />
          </Link>
        </header>
        <div id="navigator-flex" style={{ display: openMenu ? "block" : "none" }}>
          <div id="side-navigator">
            <div className="close-menu">
              <span className="material-icons" onClick={() => setOpenMenu(false)}>close</span>
            </div>
            <h3>Mục lục</h3>
            {
              titles.map(
                (title, index) => (
                  <Link href={hrefs[index]} key={index} onClick={() => setOpenMenu(false)}>{title}</Link>
                )
              )
            }
          </div>
          <div className="opacity-layer" onClick={() => setOpenMenu(false)} />
        </div>
        {children}
        <div id="copyright-footer">
          <p>© 2021-2024 Công ty Cổ phần Viễn Đông Central</p>
          <p>Giám đốc: Nguyễn Huy Liêm</p>
          <p>SĐT: 0862590591</p>
          <p>MST: 0109495463</p>
          <p>
            Địa chỉ: Tầng 10, Tòa Nhà Sông Đà 9, Đường Nguyễn Hoàng, Phường Mỹ Đình 2, Quận Nam Từ Liêm, Thành phố Hà Nội, Việt Nam
          </p>
        </div>
      </body>
    </html >
  );
}
