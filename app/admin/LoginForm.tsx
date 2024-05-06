"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Authorization from "@/app/_lib/client/authorization";
import { LoginPayload } from "@/app/_lib/types/admin/login";

export default function LoginForm(): React.JSX.Element {
  const router = useRouter();
  const [fetching, setFetching] = React.useState(false);

  async function onLogin(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    setFetching(true);

    const data = LoginPayload.fromObject(Object.fromEntries(new FormData(event.target as HTMLFormElement)));
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
      Authorization.instance.login(data.username as string, data.password as string);
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
