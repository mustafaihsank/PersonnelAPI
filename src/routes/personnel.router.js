"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
const PersonnelController = require("../controllers/personnel.controller");
const permissions = require("../middlewares/permissions");
/* ------------------------------------------------------- */

// URL: /personnels
router
  .route("/")
  .get(permissions.isAdmin, PersonnelController.list)
  .post(permissions.isAdmin, PersonnelController.create);

router
  .route("/:id")
  .get(permissions.isAdminOrThisPerson, PersonnelController.read)
  .put(permissions.isAdminOrThisPerson, PersonnelController.update)
  .patch(permissions.isAdminOrThisPerson, PersonnelController.update)
  .delete(permissions.isAdmin, PersonnelController.delete);
/* ------------------------------------------------------- */
module.exports = router;
