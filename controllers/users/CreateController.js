// import success from "../../helper/success.js";
// import error_handling from "../../helper/error.js";
// import { FindOneAkun, createAkun } from "../../services/user/userRepository.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import jwtsecret from "../../auth_config.js";

// const signup = async (req, res) => {
//   try {
//     let result = await createAkun({
//       ...req.body,
//       password: bcrypt.hashSync(req.body.password),
//     });
//     return success("Register Berhasil", 201, result, res);
//   } catch (error) {
//     console.log(error);
//     return error_handling("Register Gagal", 404, error.message, res);
//   }
// };

// export { signup };

const success = require("../../helper/success.js");
const error_handling = require("../../helper/error.js");
const {
  createAkun,
  updateAkun,
  FindOneAkunFilter,
} = require("../../services/user/userRepository.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret = require("../../auth_config.js");
const { Op } = require("sequelize");

const signup = async (req, res) => {
  try {
    let result = await createAkun({
      ...req.body,
      password: bcrypt.hashSync(req.body.password),
    });
    return success("Register Berhasil", 201, result, res);
  } catch (error) {
    console.log(error);
    return error_handling("Register Gagal", 404, error.message, res);
  }
};

const update = async (req, res) => {
  try {
    let result = { id: req.app.locals.user_id, token: req.app.locals.token };
    let check = await FindOneAkunFilter({
      where: {
        id: result.id,
      },
    });
    if (!check) {
      return error_handling("Update Gagal", 404, "id tidak ditemukan", res);
    }
    let checkUsername = await FindOneAkunFilter({
      where: {
        id: { [Op.not]: result.id },
        username: req.body.username,
      },
    });
    if (checkUsername) {
      return error_handling("Update Gagal", 404, "username sudah ada", res);
    }
    let ubah = await updateAkun(
      {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password),
      },
      {
        where: {
          id: result.id,
        },
      }
    );
    let afterUpdate = await FindOneAkunFilter({
      where: {
        id: result.id,
      },
    });
    return success("Update Berhasil", 201, afterUpdate, res);
  } catch (error) {
    console.log(error);
    return error_handling("Update Gagal", 404, error.message, res);
  }
};

const updateOther = async (req, res) => {
  try {
    let result = { id: req.app.locals.user_id, token: req.app.locals.token };

    let check = await FindOneAkunFilter({
      where: {
        id: result.id,
      },
    });
    if (!check) {
      return error_handling(
        "Update Gagal",
        404,
        "id pengguna tidak ditemukan",
        res
      );
    } else {
      if (check.role != 1) {
        return error_handling("Update Gagal", 404, "role tidak sesuai", res);
      }
    }

    if (!req.query?.id) {
      return error_handling("Update Gagal", 404, "id harus dikirim", res);
    }
    let checkUsername = await FindOneAkunFilter({
      where: {
        id: { [Op.not]: req.query.id },
        username: req.body.username,
      },
    });
    if (checkUsername) {
      return error_handling("Update Gagal", 404, "username sudah ada", res);
    }
    let ubah = await updateAkun(
      {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password),
      },
      {
        where: {
          id: req.query.id,
        },
      }
    );
    let afterUpdate = await FindOneAkunFilter({
      where: {
        id: req.query.id,
      },
    });
    return success("Update Berhasil", 201, afterUpdate, res);
  } catch (error) {
    console.log(error);
    return error_handling("Update Gagal", 404, error.message, res);
  }
};

module.exports = { signup, update, updateOther };
