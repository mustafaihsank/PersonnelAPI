"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const PersonnelModel = require("../models/personnel.model");

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
    const data = await PersonnelModel.updateOne(
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
    const data = await PersonnelModel.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
