import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next";

import "@/public/static/css/admin.css";
import "@/public/static/css/pages.css";

export const metadata: Metadata = {
  title: "Administrator dashboard",
};

// https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr
const Dashboard = dynamic(() => import("@/app/_lib/components/admin/Dashboard"), { ssr: false });

export default function Home(): React.JSX.Element {
  return <Dashboard />;
}
