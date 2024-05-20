import React from "react";
import { QueryResult } from "@vercel/postgres";

import TourItem from "../../components/tourism/TourItem";
import { DatabaseFormatError, JSONFormatError } from "../../errors";

export default class Tour {
  public readonly id: number;
  public readonly imageSrc: string;
  public readonly title: string;
  public readonly days: number;
  public readonly departure: Date;
  public readonly slots: number;
  public readonly vndCost: number;
  public readonly start: string;
  public readonly destination: string;
  public readonly international: boolean;
  public readonly description: string;

  public constructor(
    data: Readonly<{
      id: number,
      imageSrc: string,
      title: string,
      days: number,
      departure: Date,
      slots: number,
      vndCost: number,
      start: string,
      destination: string,
      international: boolean,
      description: string,
    }>,
  ) {
    this.id = data.id;
    this.imageSrc = data.imageSrc;
    this.title = data.title;
    this.days = data.days;
    this.departure = data.departure;
    this.slots = data.slots;
    this.vndCost = data.vndCost;
    this.start = data.start;
    this.destination = data.destination;
    this.international = data.international;
    this.description = data.description;
  }

  public toElement(): React.JSX.Element {
    return React.createElement(TourItem, { key: this.id, tour: this });
  }

  public static fromJson(data: any): Tour {
    if (typeof (data.id) !== "number") {
      throw new JSONFormatError("No \"id\" field");
    }
    if (typeof (data.imageSrc) !== "string") {
      throw new JSONFormatError("No \"imageSrc\" field");
    }
    if (typeof (data.title) !== "string") {
      throw new JSONFormatError("No \"title\" field");
    }
    if (typeof (data.days) !== "number") {
      throw new JSONFormatError("No \"days\" field");
    }

    if (typeof (data.departure) !== "string") {
      throw new JSONFormatError("No \"departure\" field");
    }
    data.departure = new Date(data.departure);

    if (typeof (data.slots) !== "number") {
      throw new JSONFormatError("No \"slots\" field");
    }
    if (typeof (data.vndCost) !== "number") {
      throw new JSONFormatError("No \"vndCost\" field");
    }
    if (typeof (data.start) !== "string") {
      throw new JSONFormatError("No \"start\" field");
    }
    if (typeof (data.destination) !== "string") {
      throw new JSONFormatError("No \"destination\" field");
    }
    if (typeof (data.international) !== "boolean") {
      throw new JSONFormatError("No \"international\" field");
    }
    if (typeof (data.description) !== "string") {
      throw new JSONFormatError("No \"description\" field");
    }

    return new Tour(data);
  }

  public static fromRow(row: any): Tour {
    if (typeof (row.id) !== "number") {
      throw new DatabaseFormatError("No \"id\" field");
    }
    if (typeof (row.image_src) !== "string") {
      throw new DatabaseFormatError("No \"image_src\" field");
    }
    if (typeof (row.title) !== "string") {
      throw new DatabaseFormatError("No \"title\" field");
    }
    if (typeof (row.days) !== "number") {
      throw new DatabaseFormatError("No \"days\" field");
    }
    if (!(row.departure instanceof Date)) {
      throw new DatabaseFormatError("No \"departure\" field");
    }
    if (typeof (row.slots) !== "number") {
      throw new DatabaseFormatError("No \"slots\" field");
    }
    if (typeof (row.vndCost) !== "number") {
      throw new DatabaseFormatError("No \"vndCost\" field");
    }
    if (typeof (row.start) !== "string") {
      throw new DatabaseFormatError("No \"start\" field");
    }
    if (typeof (row.destination) !== "string") {
      throw new DatabaseFormatError("No \"destination\" field");
    }
    if (typeof (row.international) !== "boolean") {
      throw new DatabaseFormatError("No \"international\" field");
    }
    if (typeof (row.description) !== "string") {
      throw new DatabaseFormatError("No \"description\" field");
    }

    return new Tour(
      {
        id: row.id,
        imageSrc: row.image_src,
        title: row.title,
        days: row.days,
        departure: row.departure,
        slots: row.slots,
        vndCost: row.vndCost,
        start: row.start,
        destination: row.destination,
        international: row.international,
        description: row.description,
      },
    );
  }

  public static fromRows(rows: QueryResult<any>): Array<Tour> {
    return rows.rows.map((row) => Tour.fromRow(row));
  }
}
