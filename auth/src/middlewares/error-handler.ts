import { Request, Response, NextFunction } from "express";

import { CustomError } from "../errors/custom-error";

// error type for validation error = errors { message: "...", field?: "..." }[]

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Handling all errors that are instance of Custom Error class
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // If the error does not fall in the above categories then send this generic error response
  res.status(400).send({ errors: [{ message: "Somwthing went wrong!" }] });
};
