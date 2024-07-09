"use client";

import Link from "next/link";
import Script from "next/script";
import React from "react";
import { Container, Image, Nav, Navbar, Offcanvas, Row, Stack } from "react-bootstrap";
import { Open_Sans } from "next/font/google";

import "@/public/static/css/copyright-footer.css";
import "@/public/static/css/utils.css";

const openSans = Open_Sans({ subsets: ["vietnamese"], weight: "400" });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  const offcanvasNavBarId = "firefly-is-love"; // window.crypto.randomUUID();
  return (
    <html lang="vi">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="Vien Dong, Viễn Đông, viendongcentral, Vien Dong Central" />
        <meta name="description" content="Công ty Cổ phần Viễn Đông Central" />
        <meta name="author" content="Nguyen Huy Liem" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <Script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossOrigin="" />
        <Script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js" crossOrigin="" />
        <Script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js" crossOrigin="" />
        <script>var Alert = ReactBootstrap.Alert;</script>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous" />
      </head>
      <body className={openSans.className}>
        <Stack className="border-bottom border-black w-100" direction="vertical">
          <Row className="bg-info m-0 p-5px w-100">
            <span>Zalo: <strong>0862.590.591</strong></span>
          </Row>
          <Row className="h-70px m-0 p-5px w-100">
            <Navbar className="g-0 h-100 p-0 w-100" expand="sm">
              <Nav.Link className="h-100" href="/">
                <Image alt="logo" className="mh-100" src="/static/images/viendong_logo.jpg" />
              </Nav.Link>
              <Navbar.Toggle aria-controls={offcanvasNavBarId} />
              <Navbar.Offcanvas id={offcanvasNavBarId} >
                <Offcanvas.Header closeButton />
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="/construction">Xây dựng</Nav.Link>
                    <Nav.Link href="/commercial">Thương mại</Nav.Link>
                    <Nav.Link href="/tourism">Vé máy bay - Du lịch</Nav.Link>
                    <Nav.Link href="/transportation">Vận tải</Nav.Link>
                    <Nav.Link href="/about">Về chúng tôi</Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Navbar>
          </Row>
        </Stack>
        {children}
        <Container className="bg-black fs-12px mt-5 p-10px text-light" fluid id="copyright-footer">
          <Container className="flex-left">
            <p>© 2021-2024 CÔNG TY CỔ PHẦN VIỄN ĐÔNG CENTRAL</p>
            <p>SĐT: 0862590591</p>
            <p>MST: 0109495463</p>
            <p>
              Địa chỉ: Tầng 10, Tòa Nhà Sông Đà 9, Đường Nguyễn Hoàng, Phường Mỹ Đình 2,
              Quận Nam Từ Liêm, Thành phố Hà Nội, Việt Nam
            </p>
          </Container>
          <Container className="flex-right">
            <Link className="position-absolute end-0 h-50px w-50px" href="https://github.com/HachiMinh/VienDongWebsite" target="_blank">
              <Image alt="GitHub logo" className="mh-100 mw-100 p-10px" rounded src="/static/images/github-mark-white.png" />
            </Link>
          </Container>
        </Container>
      </body >
    </html >
  );
}
