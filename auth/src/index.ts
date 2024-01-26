import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import mongoose from 'mongoose'

import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { currentuserRouter } from "./routes/current-user";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(json());

app.use(currentuserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const port = 3333;

const main = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log('\nConnected to MongoDB Instance.')
  } catch (error) {
    console.error(error)
  }
  app.listen(port, () => {
    console.log(`Listening for server on Port ${port}!`);
  });
}

main();