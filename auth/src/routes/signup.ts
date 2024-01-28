import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import { User } from "../models/user";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    // pulling the validation error object from the request object where it was appended using validationResult()
    const errors = validationResult(req);

    // returning the errors object as a response to a user
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    // check for the duplicate user email case
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new BadRequestError('Duplicate Email error')
    }

    // creating the user object using the mongoose user model
    const user = User.build({ email, password });

    // saving the user to database
    await user.save();

    res.status(201).json(user);

  }
);

export { router as signupRouter };
