import React from "react";
import { QueryResult } from "@vercel/postgres";

import TourItem from "../../components/tourism/TourItem";
import { convertBoolean, convertDate, convertNumber, convertString } from "../converters";

export class TourData {
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

  public get href(): string {
    return "/tourism";
  }

  public static fromJson(data: any): TourData {
    const imageSrc = convertString(data.imageSrc);
    const title = convertString(data.title);
    const days = convertNumber(data.days);
    const departure = convertDate(data.departure);
    const slots = convertNumber(data.slots);
    const vndCost = convertNumber(data.vndCost);
    const start = convertString(data.start);
    const destination = convertString(data.destination);
    const international = convertBoolean(data.international);
    const description = convertString(data.description);

    return new TourData({
      imageSrc: imageSrc,
      title: title,
      days: days,
      departure: departure,
      slots: slots,
      vndCost: vndCost,
      start: start,
      destination: destination,
      international: international,
      description: description,
    });
  }

  public static fromRow(data: any): TourData {
    const imageSrc = convertString(data.image_src);
    const title = convertString(data.title);
    const days = convertNumber(data.days);
    const departure = convertDate(data.departure);
    const slots = convertNumber(data.slots);
    const vndCost = convertNumber(data.vnd_cost);
    const start = convertString(data.start);
    const destination = convertString(data.destination);
    const international = convertBoolean(data.international);
    const description = convertString(data.description);

    return new TourData({
      imageSrc: imageSrc,
      title: title,
      days: days,
      departure: departure,
      slots: slots,
      vndCost: vndCost,
      start: start,
      destination: destination,
      international: international,
      description: description,
    });
  }

  public toElement(): React.JSX.Element {
    return React.createElement(TourItem, { tour: this });
  }
}

export default class Tour {
  public readonly id: number;
  public readonly data: TourData;

  public constructor(id: number, data: TourData) {
    this.id = id;
    this.data = data;
  }

  public get href(): string {
    return `/tourism/${this.id}`;
  }

  public toElement(): React.JSX.Element {
    return React.createElement(TourItem, { key: this.id, tour: this });
  }

  public static fromJson(data: any): Tour {
    const id = convertNumber(data.id);
    return new Tour(id, TourData.fromJson(data.data === undefined ? data : data.data));
  }

  public static fromRow(row: any): Tour {
    const id = convertNumber(row.id);
    return new Tour(id, TourData.fromRow(row));
  }

  public static fromRows(rows: QueryResult<any>): Array<Tour> {
    return rows.rows.map((row) => Tour.fromRow(row));
  }
}
