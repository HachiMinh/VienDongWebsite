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
  const [darkMode, setDarkMode] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>Công ty Viễn Đông</title>
        <link rel="icon" type="image/x-icon" href="favicon.ico?v=2" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="Vien Dong, Viễn Đông, viendongcentral, Vien Dong Central" />
        <meta name="description" content="Công ty Cổ phần Viễn Đông Central" />
        <meta name="author" content="Nguyen Huy Liem" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      </head>
      <body className={`${font.className} ${darkMode ? "dark" : "light"}`}>
        <div id="main-grid">
          <div id="main-grid-item-l">
            <img
              alt="logo"
              className="logo"
              src="/static/images/viendong_logo.jpg"
            />
          </div>
          <div id="main-grid-item-n">
            <h1>Công ty Viễn Đông</h1>
            <h3>Giám đốc Nguyễn Huy Liêm</h3>
          </div>
          <div id="main-grid-item-b">
            <div id="buttons-row">
              {
                displayMenu
                  ? <span className="material-icons left" onClick={() => setDisplayMenu(false)}>cancel</span>
                  : <span className="material-icons left" onClick={() => setDisplayMenu(true)}>menu</span>
              }
              {
                darkMode
                  ? <span className="material-icons right" onClick={() => setDarkMode(false)}>light_mode</span>
                  : <span className="material-icons right" onClick={() => setDarkMode(true)}>dark_mode</span>
              }
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
