"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
const { isAdmin } = require("../middlewares/permissions");
/* ------------------------------------------------------- */

const TokenController = require("../controllers/token.controller");

// // URL: /departments
// router
//   .route("/")
//   .get(permissions.isAdmin, TokenController.list)
//   ...

// router
//   .route("/:id")
//   .get(permissions.isAdmin, TokenController.read)
//   ...

// URL: /departments
router.use(isAdmin);

router.route("/").get(TokenController.list).post(TokenController.create);

router
  .route("/:id")
  .get(TokenController.read)
  .put(TokenController.update)
  .patch(TokenController.update)
  .delete(TokenController.delete);

/* ------------------------------------------------------- */
module.exports = router;
