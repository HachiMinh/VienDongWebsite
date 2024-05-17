"use client";

import React from "react";
import { useRouter } from "next/navigation";

import Authorization from "../../../client/authorization";
import { LoginPayload } from "../../../types/admin/login";

export default function LoginForm(): React.JSX.Element {
  const router = useRouter();
  const [fetching, setFetching] = React.useState(false);

  async function onLogin(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    setFetching(true);
    try {
      const data = LoginPayload.fromJson(Object.fromEntries(new FormData(event.target as HTMLFormElement)));
      const response = await fetch(
        "/api/admin/login",
        {
          method: "POST",
          headers: data.toHeaders(),
        },
      );

      if (response.status == 200) {
        Authorization.instance.login(data);
        router.push("/admin/dashboard");
      } else {
        alert(await response.text());
      }
    } finally {
      setFetching(false);
    }
  }

  return (
    <form onSubmit={onLogin}>
      <label htmlFor="username">Username </label>
      <input name="username" type="text" /><br /><br />
      <label htmlFor="password">Password </label>
      <input name="password" type="password" /><br /><br />
      <input disabled={fetching} type="submit" value="Login" />
    </form>
  );
}
