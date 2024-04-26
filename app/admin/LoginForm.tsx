"use client";

import React from "react";
import { useRouter } from "next/navigation";

import AuthorizationState from "@/app/_lib/client/authorization";

export default function LoginForm(): React.JSX.Element {
  const router = useRouter();
  const [fetching, setFetching] = React.useState(false);

  async function onLogin(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    setFetching(true);
    const data = Object.fromEntries(new FormData(event.target as HTMLFormElement));
    const response = await fetch(
      "/api/admin/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (response.status == 200) {
      AuthorizationState.instance.login(data.username as string, data.password as string);
      router.push("/admin/dashboard");
    } else {
      alert(await response.text());
    }

    setFetching(false);
  }

  return (
    <form onSubmit={onLogin}>
      <label htmlFor="username">Username </label>
      <input type="text" id="username" name="username" /><br /><br />
      <label htmlFor="password">Password </label>
      <input type="password" id="password" name="password" /><br /><br />
      <input disabled={fetching} type="submit" value="Login" />
    </form>
  );
}
