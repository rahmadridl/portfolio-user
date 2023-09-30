// import express from "express";
// import MainRoutes from "./routes/routes.js";
// import dotenv from "dotenv";
// dotenv.config();
// const app = express()

// app.use(express.json({ limit: "2mb" }));
// app.use(express.urlencoded(({ limit: "2mb" }, { extended: true })));

// MainRoutes(app);

// app.listen(process.env.PORT, () => console.log("Server is running on port "+process.env.PORT))

const express = require("express");
const MainRoutes = require("./routes/routes.js");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ limit: "2mb", extended: true }));

MainRoutes(app);

app.listen(process.env.PORT, () => console.log("Server is running on port " + process.env.PORT));
