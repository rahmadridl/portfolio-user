// import success from "../../helper/success.js";
// import error_handling from "../../helper/error.js";
// import {
//   FindListAkun,
//   FindOneAkun,
// } from "../../services/user/userRepository.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import jwtsecret from "../../auth_config.js";

// const read = async (req, res) => {
//   try {
//     let getData = await FindListAkun();

//     let result = { ...getData.dataValues };
//     return success("Read Berhasil", 200, result, res);
//   } catch (error) {
//     console.log(error);
//     return error_handling("Read Gagal", 404, error.message, res);
//   }
// };
// const signin = async (req, res) => {
//   try {
//     let getData = await FindOneAkun(req.body.username);
//     if (!getData) {
//       return error_handling("Login Gagal", 422, "Username Salah", res);
//     }
//     let cekPassword = bcrypt.compareSync(req.body.password, getData.password);
//     if (cekPassword) {
//       let token = jwt.sign(
//         {
//           id: getData.id,
//         },
//         jwtsecret,
//         {
//           expiresIn: "1460d", // expires in 365 days
//         }
//       );
//       let result = { ...getData.dataValues, token };
//       return success("Login Berhasil", 201, result, res);
//     } else {
//       return error_handling("Login Gagal", 422, "Password Salah", res);
//     }
//   } catch (error) {
//     console.log(error);
//     return error_handling("Login Gagal", 404, error.message, res);
//   }
// };

// export { read, signin };

const success = require("../../helper/success.js");
const error_handling = require("../../helper/error.js");
const userRepository = require("../../services/user/userRepository.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret = require("../../auth_config.js");

const read = async (req, res) => {
  try {
    // let getData = await userRepository.FindListAkun();
    let result = [
      { endpoint: "/login", method: "POST" },
      { endpoint: "/register", method: "POST" },
    ];

    return success("API Berhasil", 200, result, res);
  } catch (error) {
    console.log(error);
    return error_handling("API Gagal", 404, error.message, res);
  }
};

const signin = async (req, res) => {
  try {
    let getData = await userRepository.FindOneAkun(req.body.username);
    if (!getData) {
      return error_handling("Login Gagal", 422, "Username Salah", res);
    }
    let cekPassword = bcrypt.compareSync(req.body.password, getData.password);
    if (cekPassword) {
      let token = jwt.sign(
        {
          user_id: getData.id,
        },
        jwtsecret,
        {
          expiresIn: 86400,
        }
      );
      let result = { ...getData.dataValues, token };
      return success("Login Berhasil", 201, result, res);
    } else {
      return error_handling("Login Gagal", 422, "Password Salah", res);
    }
  } catch (error) {
    console.log(error);
    return error_handling("Login Gagal", 404, error.message, res);
  }
};

const readlist = async (req, res) => {
  try {
    let result = { id: req.app.locals.user_id, token: req.app.locals.token };

    return success("Get Profil Berhasil", 200, result, res);
  } catch (error) {
    console.log(error);
    return error_handling("Get Profil Gagal", 404, error.message, res);
  }
};

module.exports = { read, signin, readlist };
