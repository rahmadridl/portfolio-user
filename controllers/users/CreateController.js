import success from "../../helper/success.js";
import error_handling from "../../helper/error.js";
import { FindOneAkun, createAkun } from "../../services/user/userRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jwtsecret from "../../auth_config.js";

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

export { signup };
