"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const DepartmentController = require("../controllers/department.controller");

// URL: /departments
router
  .route("/")
  .get(DepartmentController.list)
  .post(DepartmentController.create);

router
  .route("/:id")
  .get(DepartmentController.read)
  .put(DepartmentController.update)
  .patch(DepartmentController.update)
  .delete(DepartmentController.delete);
/* ------------------------------------------------------- */
module.exports = router;
