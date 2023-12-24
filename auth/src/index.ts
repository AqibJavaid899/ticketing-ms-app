import express from "express";
import { json } from 'body-parser'


const app = express();
app.use(json());

app.get('/api/users/currentuser', (req, res) => {
    console.log("Hitting the correct URL")
    res.json({ message: "api is working fine!" })
})

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on Port ${port}!`)
})