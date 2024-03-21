"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
const DepartmentController = require("../controllers/department.controller");
const permissions = require("../middlewares/permissions");
/* ------------------------------------------------------- */

// URL: /departments
router
  .route("/")
  .get(permissions.isLogin, DepartmentController.list)
  .post(permissions.isAdmin, DepartmentController.create);

router
  .route("/:id")
  .get(permissions.isLogin, DepartmentController.read)
  .put(permissions.isAdmin, DepartmentController.update)
  .patch(permissions.isAdmin, DepartmentController.update)
  .delete(permissions.isAdmin, DepartmentController.delete);

router.get(
  "/:id/personnels",
  permissions.isAdminOrLead,
  DepartmentController.personnels
);
/* ------------------------------------------------------- */
module.exports = router;
