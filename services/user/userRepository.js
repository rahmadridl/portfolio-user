// import akun from "../../model/user.js";
// import { Op } from 'sequelize';

// const createAkun = async (data, transaction) => {
//   const t = transaction ? transaction : await akun.sequelize.transaction();
//   try {
//     let result = await akun.create(data, { transaction });
//     if (!transaction) t.commit();
//     return result;
//   } catch (error) {
//     if (!transaction) t.rollback();
//     console.error("[EXCEPTION] createAkun", error);
//     throw new Error(error);
//   }
// };

// const FindOneAkun = async (nama) => {
//   try {
//     // console.log('data_nama' + nama);
//     let result = await akun.findOne({
//       where: {
//         username: {[Op.not]:null},
//         // nama: nama
//       },
//     });
//     return result;
//   } catch (error) {
//     console.error("[EXCEPTION] FindOneAkun", error);
//     throw new Error(error);
//   }
// };

// const FindListAkun = async () => {
//   try {
//     // console.log('data_nama' + nama);
//     let result = await akun.findAll({

//     });
//     return result;
//   } catch (error) {
//     console.error("[EXCEPTION] FindListAkun", error);
//     throw new Error(error);
//   }
// };
// export { createAkun, FindOneAkun, FindListAkun };

const akun = require("../../model/user.js");
const { Op } = require("sequelize");

const createAkun = async (data, transaction) => {
  const t = transaction ? transaction : await akun.sequelize.transaction();
  try {
    let result = await akun.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error("[EXCEPTION] createAkun", error);
    throw new Error(error);
  }
};

const FindOneAkun = async (nama) => {
  try {
    // console.log('data_nama' + nama);
    let result = await akun.findOne({
      where: {
        username: nama,
        // nama: nama
      },
    });
    return result;
  } catch (error) {
    console.error("[EXCEPTION] FindOneAkun", error);
    throw new Error(error);
  }
};

const FindListAkun = async () => {
  try {
    // console.log('data_nama' + nama);
    let result = await akun.findAll({});
    return result;
  } catch (error) {
    console.error("[EXCEPTION] FindListAkun", error);
    throw new Error(error);
  }
};

module.exports = { createAkun, FindOneAkun, FindListAkun };
