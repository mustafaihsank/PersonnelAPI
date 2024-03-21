"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// app.use(authentication);

const TokenModel = require("../models/token.model");

module.exports = async (req, res, next) => {
  // Authorization: Token ...
  // Authorization: ApiKey ...
  // Authorization: X-API-KEY ...
  // Authorization: x-auth-token ...
  // Authorization: Bearer ...

  const auth = req.headers?.authorization || null; // Token ...tokenKey...
  const tokenKey = auth ? auth.split(" ") : null;

  if (tokenKey && tokenKey[0] === "Token") {
    const tokenData = await TokenModel.findOne({ token: tokenKey[1] }).populate(
      "userId"
    );

    if (tokenData) req.user = tokenData.userId;
  }

  next();
};
