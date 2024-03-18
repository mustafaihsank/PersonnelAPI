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
  update: async (req, res) => {
    const data = await DepartmentModel.updateOne(
      { _id: req.params.id },
      { ...req.body },
      { runValidators: true }
    );

    es.status(202).send({
      error: false,
      data,
    });
  },
  delete: async (req, res) => {
    const data = await DepartmentModel.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
  personnels: async (req, res) => {
    const Personnel = require("../models/personnel.model");
    const data = await res.getModelList(
      Personnel,
      { departmentId: req.params.id },
      "departmentId"
    );
    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(
        Personnel,
        { departmentId: req.params.id },
        "departmentId"
      ),
      data,
    });
  },
};
