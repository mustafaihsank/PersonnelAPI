"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const PersonnelController = require("../controllers/personnel.controller");

// URL: /departments
router
  .route("/")
  .get(PersonnelController.list)
  .post(PersonnelController.create);

router
  .route("/:id")
  .get(PersonnelController.read)
  .put(PersonnelController.update)
  .patch(PersonnelController.update)
  .delete(PersonnelController.delete);
/* ------------------------------------------------------- */
module.exports = router;
