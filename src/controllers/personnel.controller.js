"use strict";
const departmentModel = require("../models/department.model");
const PersonnelModel = require("../models/personnel.model");
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(PersonnelModel);
    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(PersonnelModel),
      data,
    });
  },
  create: async (req, res) => {
    if (req.body.isLead)
      await departmentModel.updateMany(
        { departmentId: req.body.departmentId, isLead: true },
        { isLead: false }
      );
    const data = await PersonnelModel.create({ ...req.body });

    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    const data = await PersonnelModel.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    // Only Admin can change salary and someones isAdmin or isLead status
    if (!req.user.isAdmin) {
      req.body.isAdmin = false;
      delete req.body.isLead;
      delete req.body.salary;
    }

    if (req.body.isLead) {
      const { departmentId } = await PersonnelModel.findOne(
        { _id: req.params.id },
        { departmentId: 1 }
      );
      await PersonnelModel.updateMany(
        { departmentId, isLead: true },
        { isLead: false }
      );
    }

    const data = await PersonnelModel.updateOne(
      { _id: req.params.id },
      { ...req.body },
      { runValidators: true }
    );

    res.status(202).send({
      error: false,
      data,
    });
  },
  delete: async (req, res) => {
    const data = await PersonnelModel.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
