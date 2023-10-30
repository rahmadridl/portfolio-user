const jwt = require("jsonwebtoken");
const jwtsecret = require("../auth_config.js");
const error_handling = require("../helper/error.js");

const authentication = async (req, res, next) => {
  try {
    const getToken = (token) => {
      const Authorization = token;
      if (Authorization) {
        return Authorization.replace("Bearer ", "");
      }

      throw new Error("not authorization");
    };
    const token = getToken(req.headers.authorization);

    if (!token) {
      // res.send("Unauthorized Access");
      error_handling("Akses tidak diizinkan", 401, "Unauthorized Access", res);
    }

    jwt.verify(token, jwtsecret, (error, decoded) => {
      if (
        (error && error.name === "JsonWebTokenError") ||
        (error && error.name === "TokenExpiredError")
      ) {
        error_handling("Akses tidak diizinkan", 401, error.name, res);
      }

      req.app.locals.token = token;
      req.app.locals.user_id = decoded.user_id;
      next()
    });
  } catch (error) {
    console.log(error);
    error_handling("Akses tidak diizinkan", 401, error.message, res);
  }
};

module.exports = authentication;
