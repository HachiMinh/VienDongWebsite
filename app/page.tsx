import React from "react";

import { Metadata } from "next";

import "@/public/static/css/home.css";

export const metadata: Metadata = {
  title: "Trang chủ | Công ty Viễn Đông"
}

export default function Home(): JSX.Element {
  return (
    <div id="home">
      <div className="floating-text">
        <h1>Công ty Cổ phần Viễn Đông Central</h1>
        <h2>VIEN DONG CENTRAL.,JSC</h2>
      </div>
      <div className="floating-image">
        <img alt="" src="/static/images/home_placeholder.png" />
      </div>
      <div className="grid-sections">
        <div className="sections">
          <div className="section-a">
            <div className="upper">
              <span className="material-icons">flight</span>
            </div>
            <div className="lower">
              <p>Du lịch</p>
            </div>
          </div>
          <div className="section-b">
            <div className="upper">
              <span className="material-icons">construction</span>
            </div>
            <div className="lower">
              <p>Xây dựng</p>
            </div>
          </div>
          <div className="section-c">
            <div className="upper">
              <span className="material-icons">shopping_bag</span>
            </div>
            <div className="lower">
              <p>Thương mại</p>
            </div>
          </div>
          <div className="section-d">
            <div className="upper">
              <span className="material-icons">info</span>
            </div>
            <div className="lower">
              <p>Về chúng tôi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
