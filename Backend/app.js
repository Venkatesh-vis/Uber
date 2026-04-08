const env = require("dotenv");
env.config();
const express = require('express');
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const connectToDB = require("./db/db");
const routes = require("./routes");

let dev = true;

//connecting to the db
connectToDB();

app.use(cors({
    origin: dev ? "http://localhost:8000" : "https://uber-three-pi.vercel.app",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req,res) => {
    res.send("hello")
})

app.use('/', routes)

module.exports = app;