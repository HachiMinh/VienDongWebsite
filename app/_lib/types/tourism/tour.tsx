import React from "react";

import TourItem from "@/app/tourism/TourItem";
import { TypeCheckingException } from "../../errors";

export default class Tour {
  public readonly id: number;
  public readonly imageSrc: string;
  public readonly title: string;
  public readonly schedule: string;
  public readonly departure: string;
  public readonly slots: number | null;

  public constructor(id: number, imageSrc: string, title: string, schedule: string, departure: string, slots: number | null) {
    this.id = id;
    this.imageSrc = imageSrc;
    this.title = title;
    this.schedule = schedule;
    this.departure = departure;
    this.slots = slots;
  }

  public toElement(): React.JSX.Element {
    return (
      <TourItem
        key={this.id}
        imageSrc={this.imageSrc}
        title={this.title}
        schedule={this.schedule}
        departure={this.departure}
        slots={this.slots === null ? "Unknown" : this.slots.toString()}
      />
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
    if (typeof (data.slots) !== "number" && data.slots !== null) {
      throw new TypeCheckingException("No \"slots\" field");
    }

    return new Tour(data.id, data.imageSrc, data.title, data.schedule, data.departure, data.slots);
  }
}
