"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const TokenModel = require("../models/token.model");

module.exports = {
  list: async (req, res) => {
    /* 
      _swagger.deprecated = true // bunu yaparsan swaggerUI'da üstünü cizer depracated gösterir
      #swagger.ignore = true
    */
    const data = await res.getModelList(TokenModel);

    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(TokenModel),
      data, // data: data
    });
  },

  create: async (req, res) => {
    /* 
      _swagger.deprecated = true // bunu yaparsan swaggerUI'da üstünü cizer depracated gösterir
      #swagger.ignore = true
    */
    const data = await TokenModel.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /* 
      _swagger.deprecated = true // bunu yaparsan swaggerUI'da üstünü cizer depracated gösterir
      #swagger.ignore = true
    */
    const data = await TokenModel.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /* 
      _swagger.deprecated = true // bunu yaparsan swaggerUI'da üstünü cizer depracated gösterir
      #swagger.ignore = true
    */
    const data = await TokenModel.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await TokenModel.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /* 
      _swagger.deprecated = true // bunu yaparsan swaggerUI'da üstünü cizer depracated gösterir
      #swagger.ignore = true
    */
    const data = await TokenModel.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
