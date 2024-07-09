import { ConversionError } from "./errors";

export function convertBoolean(value: any): boolean {
  if (typeof value === "string") {
    switch (value.toLowerCase()) {
      case "true":
      case "on":
        value = true;
        break;

      case "false":
      case "off":
        value = false;
        break;

      default:
        throw new ConversionError(`Cannot convert string \"${value}\" to boolean`);
    }
  }

  if (typeof value === "boolean") {
    return value;
  }

  throw new ConversionError(`Expected a boolean, got ${typeof value}`);
}

export function convertDate(value: any): Date {
  if (typeof value === "string") {
    return new Date(value);
  }

  if (value instanceof Date) {
    return value;
  }

  throw new ConversionError(`Expected a Date, got ${typeof value}`);
}

export function convertNumber(value: any): number {
  if (typeof value === "string") {
    value = Number(value);
  }

  if (typeof value === "number") {
    return value;
  }

  throw new ConversionError(`Expected a number, got ${typeof value}`);
}

export function convertString(value: any): string {
  if (typeof value === "string") {
    return value;
  }

  throw new ConversionError(`Expected a string, got ${typeof value}`);
}
