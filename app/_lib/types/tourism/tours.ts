import React from "react";

import TourItem from "../../components/tourism/TourItem";
import { JSONFormatError } from "../../errors";

export default class Tour {
  public readonly id: number;
  public readonly imageSrc: string;
  public readonly title: string;
  public readonly days: number;
  public readonly departure: Date;
  public readonly slots: number;
  public readonly vndCost: number;
  public readonly start: string;
  public readonly end: string;
  public readonly international: boolean;

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
      end: string,
      international: boolean,
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
    this.end = data.end;
    this.international = data.international;
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
    if (typeof (data.end) !== "string") {
      throw new JSONFormatError("No \"end\" field");
    }

    return new Tour(data);
  }
}
