"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require("express");
const app = express();

/* ------------------------------------------------------- */
// Required Modules:

//envVariables to process.env.
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// Configurations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
// MORGAN -> LOGGING
app.use(require("./src/middlewares/logging"));

/* ------------------------------------------------------- */
// Documentation
// $ npm i swagger-autogen
// $ npm i swagger-ui-express
// $ npm i redoc-express

// JSON -> localhost:8000/documents/json
app.use("/documents/json", (req, res) => {
  res.sendFile("swagger.json", { root: "." });
});

// Swagger UI -> -> localhost:8000/documents/swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJson = require("./swagger.json");
app.use(
  "/documents/swagger",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJson, {
    swaggerOptions: { persistAuthorization: true },
  })
);

// REDOC -> localhost:8000/documents/redoc
const redoc = require("redoc-express");
app.use(
  "/documents/redoc",
  redoc({
    title: "PersonnelAPI",
    specUrl: "/documents/json",
  })
);

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json());

// SessionsCookies:
app.use(require("cookie-session")({ secret: process.env.SECRET_KEY }));

// res.getModelList():
app.use(require("./src/middlewares/findSearchSortPage"));

/* ------------------------------------------------------- */
// Authentication With Simple Token:

// Authentication:
app.use(require("./src/middlewares/authentication"));
/* ------------------------------------------------------- */

/* ------------------------------------------------------- */
// Routes:

app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to Personnel API",
    user: res.user,
    api: {
      documents: {
        swagger: "http://127.0.0.1:8000/documents/swagger",
        redoc: "http://127.0.0.1:8000/documents/redoc",
        json: "http://127.0.0.1:8000/documents/json",
      },
      contact: "mustafaihsankabakcili@gmail.com",
    },
  });
});

// routes
app.use(require("./src/routes"));

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require("./src/helpers/sync")();
