import { Request, Response, NextFunction } from "express";

import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

// error type for validation error = errors { message: "...", field?: "..." }[]

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // Handling of Error type RequestValidationError
  if (err instanceof RequestValidationError) {
    const formattedErrorResponse = err.errors.map((error) => {
      if (error.type === "field") {
        return { message: error.msg, field: error.path };
      }
    });
    return res.status(400).send({ errors: formattedErrorResponse });
  }

  // Handling of Error type DatabaseConnectionError
  if (err instanceof DatabaseConnectionError) {
    return res.status(500).send({ errors: [{ message: err.reason }] });
  }

  // If the error does not fall in the above categories then send this generic error response
  res.status(400).send({ errors: [{ message: "Somwthing went wrong!" }] });
};
