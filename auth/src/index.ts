import express from "express";
import { json } from 'body-parser'

import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { currentuserRouter } from "./routes/current-user";


const app = express();
app.use(json());

app.use(currentuserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on Port ${port}!`)
})