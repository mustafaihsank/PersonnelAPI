"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const morgan = require("morgan");

// To see the logs in console:
// app.use(
//   morgan(
//     "IP=:remote-addr | TIME=:date[clf] | METHOD=:method | URL=:url | STATUS=:status | LENGTH=:res[content-length] | REF=:referrer |  AGENT=:user-agent"
//   )
// ); // You can also use these strings => combined - common - dev - short - tiny

// To write logs to a file:
// const fs = require("fs");
// app.use(
//   morgan("combined", {
//     stream: fs.createWriteStream("./access.log", { flags: "a+" }), // a+ means -> If there is no log file, create it. Read this file and add new logs to next line and
//   })
// );

// To write logs to a file day by day:
// const fs = require("fs");
// const now = new Date();
// const today = now.toISOString().split("T")[0];
// app.use(
//   morgan("combined", {
//     stream: fs.createWriteStream(`./logs/${today}.log`, { flags: "a+" }), // a+ means -> If there is no log file, create it. Read this file and add new logs to next line and
//   })
// );

const fs = require("fs");
const now = new Date();
const today = now.toISOString().split("T")[0];
module.exports = morgan("combined", {
  stream: fs.createWriteStream(`./logs/${today}.log`, { flags: "a+" }), // a+ means -> If there is no log file, create it. Read this file and add new logs to next line and
});
