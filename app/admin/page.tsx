import React from "react";
import { Metadata } from "next";

import LoginForm from "@/app/_lib/components/admin/login/LoginForm";

import "@/public/static/css/pages.css";

export const metadata: Metadata = {
  title: "Login",
};

export default function Home(): React.JSX.Element {
  return (
    <div className="page-section admin-login">
      <div className="intro-section">
        <div className="header-1" style={{ color: "black" }}>
          <h1>Login</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
