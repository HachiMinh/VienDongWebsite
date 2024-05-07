import React from "react";

import TourItem from "../../components/TourItem";
import { TypeCheckingException } from "../../errors";

export default class Tour {
  public readonly id: number;
  public readonly imageSrc: string;
  public readonly title: string;
  public readonly schedule: string;
  public readonly departure: string;
  public readonly slots: number;
  public readonly vndCost: number;

  public constructor(
    id: number,
    imageSrc: string,
    title: string,
    schedule: string,
    departure: string,
    slots: number,
    vndCost: number,
  ) {
    this.id = id;
    this.imageSrc = imageSrc;
    this.title = title;
    this.schedule = schedule;
    this.departure = departure;
    this.slots = slots;
    this.vndCost = vndCost;
  }

  private static slapCommasToThisNumber(number: number): string {
    const parts = number.toString().split(".");
    const integerPart = parts[0] || "0";

    // Reverse the integer part for easier comma insertion
    const reversedInteger = integerPart.split("").reverse().join("");
    let formattedInteger = "";
    for (let i = 0; i < reversedInteger.length; i++) {
      if (i > 0 && i % 3 === 0) {
        formattedInteger += ",";
      }
      formattedInteger += reversedInteger[i];
    }

    // Reverse the formatted integer back to normal order
    let result = formattedInteger.split("").reverse().join("");

    const decimalPart = parts[1];
    if (decimalPart !== undefined) {
      result += `.${decimalPart}`;
    }

    return result;
  }

  public toElement(): React.JSX.Element {
    return React.createElement(
      TourItem,
      {
        key: this.id,
        imageSrc: this.imageSrc,
        title: this.title,
        schedule: this.schedule,
        departure: this.departure,
        slots: this.slots.toString(),
        cost: `${Tour.slapCommasToThisNumber(this.vndCost)} đ`,
      },
    );
  }

  public static fromObject(data: any): Tour {
    if (typeof (data.id) !== "number") {
      throw new TypeCheckingException("No \"id\" field");
    }
    if (typeof (data.imageSrc) !== "string") {
      throw new TypeCheckingException("No \"imageSrc\" field");
    }
    if (typeof (data.title) !== "string") {
      throw new TypeCheckingException("No \"title\" field");
    }
    if (typeof (data.schedule) !== "string") {
      throw new TypeCheckingException("No \"schedule\" field");
    }
    if (typeof (data.departure) !== "string") {
      throw new TypeCheckingException("No \"departure\" field");
    }
    if (typeof (data.slots) !== "number") {
      throw new TypeCheckingException("No \"slots\" field");
    }
    if (typeof (data.vndCost) !== "number") {
      throw new TypeCheckingException("No \"vndCost\" field");
    }

    return new Tour(data.id, data.imageSrc, data.title, data.schedule, data.departure, data.slots, data.vndCost);
  }
}
