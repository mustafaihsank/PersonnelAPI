"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

// URL: /auth
router.use("/auth", require("./auth.router"));
// URL: /tokens
router.use("/tokens", require("./token.router"));
// URL: /personnels
router.use("/personnels", require("./personnel.router"));
// URL: /departments
router.use("/departments", require("./department.router"));

module.exports = router;
