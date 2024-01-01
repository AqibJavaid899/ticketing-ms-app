import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  public statusCode = 500;
  public reason = "Error connecting to db!";

  constructor() {
    super("Error connecting to the db!");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
