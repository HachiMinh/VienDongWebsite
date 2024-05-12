"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Authorization from "../../../client/authorization";

export default function Redirect(): React.JSX.Element {
  const router = useRouter();

  // https://stackoverflow.com/a/63424831
  React.useEffect(
    () => {
      if (!Authorization.instance.loggedIn) {
        router.push("/admin");
      }
    },
  );

  return <h1>Welcome <u>{Authorization.instance.username}</u>!</h1>;
}
