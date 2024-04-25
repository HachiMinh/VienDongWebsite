"use client";

import React from "react";
import { useRouter } from "next/navigation";

import AuthorizationState from "@/app/_lib/client/authorization";

export default function Redirect(): React.JSX.Element {
  const router = useRouter();

  // https://stackoverflow.com/a/63424831
  React.useEffect(
    () => {
      if (!AuthorizationState.instance.loggedIn) {
        router.push("/admin");
      }
    },
  );

  return <h1>Welcome <u>{AuthorizationState.instance.username}</u>!</h1>;
}
