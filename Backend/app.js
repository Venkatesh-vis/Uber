const env = require("dotenv");
env.config();
const express = require('express');
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const connectToDB = require("./db/db");
const userRoutes = require("./routes/user.routes")

//connecting to the db
connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req,res) => {
    res.send("hello")
})

app.use('/users', userRoutes)

module.exports = app;