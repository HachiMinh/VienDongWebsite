"use client";

import React from "react";
import { useRouter } from "next/navigation";

import AuthorizationState from "@/app/_lib/client/authorization";

import "@/public/static/css/pages.css";

export default function Home(): React.JSX.Element {
  if (!AuthorizationState.instance.loggedIn) {
    const router = useRouter();
    router.push("/admin");
  }

  return (
    <div className="page-section">
      <div className="intro-section">
        <div className="header-1" style={{ color: "black" }}>
          <h1>Welcome <u>{AuthorizationState.instance.username}</u>!</h1>
        </div>
      </div>
    </div>
  );
}
