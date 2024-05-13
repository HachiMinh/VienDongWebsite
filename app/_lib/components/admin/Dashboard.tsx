"use client";

import React from "react";
import { QueryResult } from "@vercel/postgres";
import { useRouter } from "next/navigation";

import Authorization from "../../client/authorization";
import { LoginPayload } from "../../types/admin/login";
import { SQLQuery } from "../../types/admin/sql";

export default function Dashboard(): React.JSX.Element {
  const router = useRouter();
  const [sql, setSql] = React.useState(false);
  const [sqlTable, setSqlTable] = React.useState(<></>);

  // https://stackoverflow.com/a/63424831
  React.useEffect(
    () => {
      if (!Authorization.instance.loggedIn) {
        router.push("/admin");
      }
    },
    [],
  );

  async function onSql(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    setSql(true);
    try {
      const data = SQLQuery.fromJson(Object.fromEntries(new FormData(event.target as HTMLFormElement)));

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
        console.log(data);
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

  return (
    <>
      <div className="page-section admin">
        <div className="intro-section">
          <div className="header-1" style={{ color: "black" }}>
            <h1>Welcome <u>{Authorization.instance.username}</u>!</h1>
          </div>
        </div>
      </div>
      <div className="page-content sql">
        <div className="sql-header">
          <h2 className="horizontal-center">SQL query</h2>
        </div>
        <form className="sql" onSubmit={onSql}>
          <textarea id="query" name="query" rows={5} />
          <input disabled={sql} type="submit" value="Run" />
          <button onClick={() => setSqlTable(<></>)} type="button">Clear</button>
        </form>
      </div>
      <div className="page-content sql-table">
        {sqlTable}
      </div>
    </>
  );
}
