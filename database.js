// // const { Pool } = require("pg");
// import Sequelize from "sequelize";
// import dotenv from "dotenv";
// dotenv.config();

// // const pool = new Pool({
// //   connectionString: process.env.POSTGRES_URL + "?sslmode=require",
// // });

// const sequelizeInstance = new Sequelize(
//   process.env.POSTGRES_URL + "?sslmode=require"
// );

// // pool.connect((err) => {
// //   if (err) throw err;
// //   console.log("Connect to PostgreSQL successfully!");
// // });

// sequelizeInstance
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });

// export default sequelizeInstance;

const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelizeInstance = new Sequelize(process.env.POSTGRES_URL+ "?sslmode=require", {
  dialectModule: require("pg"),
});

sequelizeInstance
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelizeInstance;
