"use client";

import React from "react";
import { QueryResult } from "@vercel/postgres";
import { useRouter } from "next/navigation";

import Authorization from "../../client/authorization";
import { ChangePasswordPayload } from "../../types/admin/password";
import { LoginPayload } from "../../types/admin/login";
import { SQLQueryPayload } from "../../types/admin/sql";

export default function Dashboard(): React.JSX.Element {
  const router = useRouter();
  const [sql, setSql] = React.useState(false);
  const [sqlTable, setSqlTable] = React.useState(<></>);
  const [changingPassword, setChangingPassword] = React.useState(false);

  // https://stackoverflow.com/a/63424831
  React.useEffect(
    () => {
      Authorization.instance.validate().then(
        (valid) => {
          if (!valid) {
            router.push("/admin");
          }
        },
      )
    },
    [],
  );

  async function onSql(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setSql(true);
    try {
      const data = SQLQueryPayload.fromJson(Object.fromEntries(new FormData(event.target as HTMLFormElement)));

      const headers = LoginPayload.fromSessionStorage().toHeaders();
      headers.set("Content-Type", "application/json");

      const response = await fetch(
        "/api/admin/sql",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
        },
      );
      if (response.status === 200) {
        const data = await response.json() as QueryResult<any>;
        console.log(data);  // intentional logging
        setSqlTable(
          <table>
            <thead>
              <tr>
                {data.fields.map((field, index) => <th key={index}>{field.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value: any, valueIndex) => <td key={valueIndex}>{value}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        );
      } else {
        const text = await response.text();
        setSqlTable(
          <>
            <h3 style={{ color: "red" }}>{`HTTP ${response.status}`}</h3>
            <p style={{ color: "red" }}>{text}</p>
          </>
        );
      }

    } finally {
      setSql(false);
    }
  }

  async function onChangePassword(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setChangingPassword(true);
    try {
      const data = ChangePasswordPayload.fromJson(Object.fromEntries(new FormData(event.target as HTMLFormElement)));
      if (!data.match()) {
        alert("New passwords do not match");
        return;
      }

      const headers = LoginPayload.fromSessionStorage().toHeaders();
      headers.set("Content-Type", "application/json");

      const response = await fetch(
        "/api/admin/change-password",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
        },
      );
      if (response.status === 200) {
        alert("Password changed successfully. Please login again.");
        router.push("/admin");
      } else {
        const text = await response.text();
        alert(text);
      }

    } finally {
      setChangingPassword(false);
    }
  }

  return (
    <>
      <div className="page-header admin">
        <div className="intro-section">
          <div className="header-1" style={{ color: "black" }}>
            <h1>Welcome <u>{Authorization.instance.username}</u>!</h1>
          </div>
        </div>
      </div>
      <div className="page-content admin grid-view sql">
        <div className="section-l">
          <h2 className="horizontal-center">SQL query</h2>
        </div>
        <form className="section-r" onSubmit={onSql}>
          <textarea name="query" rows={5} />
          <input disabled={sql} type="submit" value="Run" />
          <button onClick={() => setSqlTable(<></>)} type="button">Clear</button>
        </form>
      </div>
      <div className="page-content admin sql-table">
        {sqlTable}
      </div>
      <div className="page-content admin grid-view change-password">
        <div className="section-l">
          <h2 className="horizontal-center">Change password</h2>
        </div>
        <form className="section-r" onSubmit={onChangePassword}>
          <label htmlFor="old-password">Old password </label>
          <input name="oldPassword" type="password" /><br /><br />
          <label htmlFor="new-password">New password </label>
          <input name="newPassword" type="password" /><br /><br />
          <label htmlFor="confirm-new-password">Confirm new password </label>
          <input name="confirmNewPassword" type="password" /><br /><br />
          <input disabled={changingPassword} type="submit" value="Confirm" />
        </form>
      </div>
    </>
  );
}
