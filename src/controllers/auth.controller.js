"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const PersonnelModel = require("../models/personnel.model");
const TokenModel = require("../models/token.model");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  // LOGIN & LOGOUT

  login: async (req, res) => {
    /*
      #swagger.tags = ['Authentication']
      #swagger.summary = 'Login'
      #swagger.description = 'Login with username and password'
      #swagger.parameters['body'] = {
        in: 'body',
        required: 'true',
        schema: {
          username: 'test',
          password: '1234'
        }
      }
    */
    const { username, password } = req.body;

    if (username && password) {
      const user = await PersonnelModel.findOne({ username, password });
      if (user) {
        /* ------------------------------------------------------- */
        // WITH SESSION COOKIE
        // // Set Session:
        // req.session = {
        //   id: user._id,
        //   password: user.password,
        // };
        // // Set Cookie:
        // if (req.body?.rememberMe) {
        //   req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3; // 3 Days
        // }
        /* ------------------------------------------------------- */

        /* ------------------------------------------------------- */
        // WITH TOKEN
        const tokenData = await TokenModel.findOne({ userId: user._id });

        const tokenKey = passwordEncrypt(user._id + Date.now());

        if (!tokenData) {
          await TokenModel.create({
            userId: user._id,
            token: tokenKey,
          });
        }
        /* ------------------------------------------------------- */

        res.status(200).send({
          error: false,
          token: tokenData.token,
          user,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong Username or Password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please entry username and password.");
    }
  },

  logout: async (req, res) => {
    /*
      #swagger.tags = ['Authentication']
      #swagger.summary = 'Logout'
      #swagger.description = 'Delete Token'
    */

    /* ------------------------------------------------------- */
    // WITH SESSION COOKIE
    // Set session to null if you use session:
    req.session = null;
    /* ------------------------------------------------------- */

    /* ------------------------------------------------------- */
    // WITH TOKEN
    // 1. Quick Way
    // await TokenModel.deleteOne({ userId: req.user._id });
    // 2. Way
    const auth = req.headers?.authorization || null; // Token ...tokenKey...
    const tokenKey = auth ? auth.split(" ") : null;

    if (tokenKey && tokenKey[0] === "Token") {
      await TokenModel.deleteOne({
        token: tokenKey[1],
      });
    }

    /* ------------------------------------------------------- */
    res.status(200).send({
      error: false,
      message: "Logout: Sessions/Tokens Deleted.",
    });
  },
};
