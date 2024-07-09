export class BaseException extends Error {
  constructor(message: string) {
    super(message);

    // Set the prototype explicitly.
    // See why: https://stackoverflow.com/a/41429145
    Object.setPrototypeOf(this, BaseException.prototype);
  }
}

export class ConversionError extends BaseException {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ConversionError.prototype);
  }
}
