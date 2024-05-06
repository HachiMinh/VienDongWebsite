export class BaseException extends Error {
  constructor(message: string) {
    super(message);

    // Set the prototype explicitly.
    // See why: https://stackoverflow.com/a/41429145
    Object.setPrototypeOf(this, BaseException.prototype);
  }
}


export class TypeCheckingException extends BaseException {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, TypeCheckingException.prototype);
  }
}
