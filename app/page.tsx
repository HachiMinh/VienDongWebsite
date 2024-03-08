import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang chủ | Công ty Viễn Đông"
}

export default function Home(): JSX.Element {
  return (
    <div id="home">
      <div className="floating-text">
        <h1>Công ty Viễn Đông</h1>
        <h2>Placeholder h2 title...</h2>
      </div>
      <div className="floating-image">
        <img alt="" src="/static/images/home_placeholder.png" />
      </div>
      <div className="grid-sections">
        <div className="sections">
          <div className="section-a">
            <div className="upper">
              <img alt="" src="/static/images/viendong_logo.jpg" />
            </div>
            <div className="lower">
              <p>Du lịch</p>
            </div>
          <div className="section-b">
            <div className="upper">
              <img alt="" src="/static/images/viendong_logo.jpg" />
            </div>
            <div className="lower">
              <p>Xây dựng</p>
            </div>
          </div>
          <div className="section-c">
            <div className="upper">
              <img alt="" src="/static/images/viendong_logo.jpg" />
            </div>
            <div className="lower">
              <p>Thương mại</p>
            </div>
          </div>
          <div className="section-d">
            <div className="upper">
              <img alt="" src="/static/images/viendong_logo.jpg" />
            </div>
            <div className="lower">
              <p>Section D</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
