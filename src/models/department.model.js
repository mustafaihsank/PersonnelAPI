"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

var DepartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    departmentId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { collection: "Department", timestamps: true }
);

module.exports = mongoose.model("Department", DepartmentSchema);
