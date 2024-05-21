"use client";

import Link from "next/link";
import React from "react";
import { QueryResult } from "@vercel/postgres";
import { useRouter } from "next/navigation";

import Authorization from "../../client/authorization";
import TourList from "../tourism/TourList";
import { ChangePasswordPayload } from "../../types/admin/password";
import { LoginPayload } from "../../types/admin/login";
import { SQLQueryPayload } from "../../types/admin/sql";
import Tour, { TourData } from "../../types/tourism/tours";

class AddTourAction {
  public static readonly IDLE = 0;
  public static readonly PREVIEW = 1;
  public static readonly ADDING = 2;
}

export default function Dashboard(): React.JSX.Element {
  const router = useRouter();
  const [sql, setSql] = React.useState(false);
  const [sqlTable, setSqlTable] = React.useState(<></>);
  const [changingPassword, setChangingPassword] = React.useState(false);
  const [showAddTourModal, setShowAddTourModal] = React.useState(false);
  const [addingTour, setAddingTour] = React.useState(AddTourAction.IDLE);
  const [addTourPreview, setAddTourPreview] = React.useState(<></>);
  const [addTourLink, setAddTourLink] = React.useState(<></>);

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
        alert("Mật khẩu mới không khớp.");
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
        alert("Thay đổi mật khẩu thành công. Hãy đăng nhập lại.");
        router.push("/admin");
      } else {
        const text = await response.text();
        alert(text);
      }

    } finally {
      setChangingPassword(false);
    }
  }

  async function onAddTour(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.target as HTMLFormElement)) as any;
    data.international ??= false;

    const tour = TourData.fromJson(data);

    switch (addingTour) {
      case AddTourAction.IDLE:
        setAddingTour(AddTourAction.PREVIEW);
        setAddTourPreview(tour.toElement());
        break;

      case AddTourAction.PREVIEW:
        setAddingTour(AddTourAction.ADDING);
        try {
          const headers = LoginPayload.fromSessionStorage().toHeaders();
          headers.set("Content-Type", "application/json");

          const response = await fetch(
            "/api/admin/tourism/add-tour",
            {
              body: JSON.stringify(tour),
              method: "POST",
              headers: headers,
            },
          );
          if (response.status === 200) {
            const tour = Tour.fromJson(await response.json());
            setAddTourLink(<Link href={tour.href} target="_blank">Thêm tour thành công</Link>);
          }

        } finally {
          setAddingTour(AddTourAction.IDLE);
        }
        break;

      case AddTourAction.ADDING:
        break;
    }
  }

  return (
    <>
      <div className="page-header admin">
        <div className="intro-section">
          <div className="header-1" style={{ color: "black" }}>
            <h1>Xin chào <span style={{ color: "blue" }}>{Authorization.instance.username}</span>!</h1>
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
          <h2 className="horizontal-center">Đổi mật khẩu</h2>
        </div>
        <form className="section-r" onSubmit={onChangePassword}>
          <label htmlFor="old-password">Mật khẩu cũ </label>
          <input name="oldPassword" type="password" /><br /><br />
          <label htmlFor="new-password">Mật khẩu mới </label>
          <input name="newPassword" type="password" /><br /><br />
          <label htmlFor="confirm-new-password">Xác nhận mật khẩu mới </label>
          <input name="confirmNewPassword" type="password" /><br /><br />
          <input disabled={changingPassword} type="submit" value="Confirm" />
        </form>
      </div>
      <div className="page-content admin tours-list">
        <h2>Danh sách tour du lịch</h2>
        <TourList />
        <div className="add-button" onClick={() => setShowAddTourModal(true)}>
          <span className="material-icons">add</span>
          <span className="text">Thêm tour</span>
        </div>
      </div>
      <div className="admin modal"
        id="add-tour-modal"
        hidden={!showAddTourModal}
        onClick={
          // https://www.w3schools.com/howto/howto_css_login_form.asp
          (event) => {
            const modal = document.getElementById("add-tour-modal");
            if (event.target == modal) {
              setShowAddTourModal(false);
            }
          }
        }>
        <div id="add-tour-modal-inner">
          <h1>Thêm tour du lịch mới</h1>
          <form onChange={() => setAddingTour(AddTourAction.IDLE)} onSubmit={onAddTour}>
            <label htmlFor="imageSrc">URL banner </label>
            <input name="imageSrc" autoComplete="off" /><br />
            <label htmlFor="title">Tiêu đề tour </label>
            <input name="title" autoComplete="off" /><br />
            <label htmlFor="days">Lịch trình (số ngày) </label>
            <input name="days" type="number" min="1" /><br />
            <label htmlFor="departure">Ngày khởi hành </label>
            <input name="departure" type="date" /><br />
            <label htmlFor="slots">Số chỗ còn nhận </label>
            <input name="slots" type="number" min="0" /><br />
            <label htmlFor="vndCost">Chi phí </label>
            <input name="vndCost" type="number" min="1000" /><br />
            <label htmlFor="start">Điểm xuất phát </label>
            <input name="start" autoComplete="off" /><br />
            <label htmlFor="destination">Điểm đến </label>
            <input name="destination" autoComplete="off" /><br />
            <label htmlFor="international">Tour quốc tế </label>
            <input name="international" type="checkbox" /><br />
            <p>Mô tả chi tiết</p>
            <textarea name="description" rows={5} /><br />
            <input disabled={addingTour === AddTourAction.ADDING}
              type="submit"
              value={addingTour === AddTourAction.IDLE ? "Preview" : "Thêm tour"} />
            {addTourLink}
          </form>
          <div className="tour-preview">{addTourPreview}</div>
        </div>
      </div>
    </>
  );
}
