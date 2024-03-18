"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const DepartmentModel = require("../models/department.model");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(DepartmentModel);
    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(DepartmentModel),
      data,
    });
  },
  create: async (req, res) => {
    const data = await DepartmentModel.create({ ...req.body });

    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    const data = await DepartmentModel.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {},
  delete: async (req, res) => {},
};
