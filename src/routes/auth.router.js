"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const AuthController = require("../controllers/auth.controller");

// URL: /auth
router.post("/login", AuthController.login);
router.all("/logout", AuthController.logout);
/* ------------------------------------------------------- */
module.exports = router;
