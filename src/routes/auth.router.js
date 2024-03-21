"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const AuthController = require("../controllers/auth.controller");

// URL: /auth
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout); // Swagger router.all'u görmez, dökümantasyon icin onu get yap
/* ------------------------------------------------------- */
module.exports = router;
