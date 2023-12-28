export class DatabaseConnectionError extends Error {
  public reason = "Error connecting to database";

  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
