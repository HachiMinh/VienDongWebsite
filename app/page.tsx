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
        <h1>Công ty Viễn Đông</h1>
        <h2>Placeholder h2 title...</h2>
      </div>
      <div className="floating-image">
        <img alt="" src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/daf11e841a355a75ad183ee4/gfgggggg-min.jpg" />
      </div>
      <div className="grid-sections">
        <div className="sections">
          <div className="section-a">
            <div className="upper">
              <img alt="" src="/static/images/viendong_logo.jpg" />
            </div>
            <div className="lower">
              <p>Section A</p>
            </div>
          </div>
          <div className="section-b">
            <div className="upper">
              <img alt="" src="/static/images/viendong_logo.jpg" />
            </div>
            <div className="lower">
              <p>Section B</p>
            </div>
          </div>
          <div className="section-c">
            <div className="upper">
              <img alt="" src="/static/images/viendong_logo.jpg" />
            </div>
            <div className="lower">
              <p>Section C</p>
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
