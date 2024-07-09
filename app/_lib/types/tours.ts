import React from "react";

import TourItem from "../components/tourism/TourItem";
import { convertBoolean, convertDate, convertNumber, convertString } from "./converters";

export default class Tour {
  public readonly id: string;
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

  private constructor(
    data: Readonly<{
      id: string;
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

  public get href(): string {
    return `/tourism/${this.id}`;
  }

  public toElement(): React.JSX.Element {
    return React.createElement(TourItem, { tour: this });
  }

  public static fromJson(data: any): Tour {
    const id = convertString(data.id);
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

    return new Tour({
      id: id,
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

  public static async fetch(): Promise<Array<Tour>> {
    const request = await fetch("/static/data/tours.json");
    return Array.from(await request.json()).map((data) => Tour.fromJson(data));
  }
}
