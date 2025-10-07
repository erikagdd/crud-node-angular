"use strict";

const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectdb = require("./app/config/config_db");

dotenv.config();

var corsOptions = {
    origin: "http://localhost:4200",
};

const PORT = process.env.PORT || 8080;
const app = express();

connectdb();

app.use(cors(corsOptions));
app.use(express.json());
require('./app/models/index.js');
app.use(require("./app/router/index"));

app.listen(PORT, () => {
    console.log(`The app is in 127.0.0.1:${PORT}`);
});
