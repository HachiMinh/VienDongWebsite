"use client";

import Link from "next/link";
import React from "react";
import { Open_Sans } from "next/font/google";
import { MouseEventHandler, useState } from "react";

import "@/public/static/css/layout.css";

const font = Open_Sans({ subsets: ["vietnamese"], weight: "400" });
const titles = ["Home", "Section A", "Section B"];
const hrefs = ["/", "/a", "/b"];

function Menu({ onItemClick }: Readonly<{ onItemClick: MouseEventHandler<HTMLSpanElement> }>): JSX.Element {
  return (
    <nav className="nav-menu">
      <ul>
        {titles.map((title, index) => <li key={index}><Link href={hrefs[index]} onClick={onItemClick}>{title}</Link></li>)}
      </ul>
    </nav>
  );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>): JSX.Element {
  const [displayMenu, setDisplayMenu] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>Công ty Viễn Đông</title>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      </head>
      <body className={font.className}>
        <div id="main-grid">
          <div id="main-grid-item-l">
            <img
              className="logo"
              src="/static/images/logo.png"
            />
          </div>
          <div id="main-grid-item-n">
            <h1>Công ty Viễn Đông</h1>
            <h3>Giám đốc Nguyễn Huy Liêm</h3>
          </div>
          <div id="main-grid-item-b">
            <div id="buttons-row-hidden-on-desktop">
              {
                displayMenu
                  ? <span className="material-icons" onClick={() => setDisplayMenu(false)}>cancel</span>
                  : <span className="material-icons" onClick={() => setDisplayMenu(true)}>menu</span>
              }
              <span className="material-icons settings">settings</span>
            </div>
            <div id="hidden-menu-on-mobile">
              <Menu onItemClick={() => setDisplayMenu(false)} />
            </div>
          </div>
          <div id="main-grid-item-m">
            {
              displayMenu
                ? <Menu onItemClick={() => setDisplayMenu(false)} />
                : children
            }
          </div>
        </div>
      </body>
    </html >
  );
}
