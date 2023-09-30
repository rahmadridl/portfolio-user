// import { signup } from "../../controllers/users/CreateController.js";
// import { read, signin } from "../../controllers/users/ReadController.js";

// const AkunRoutes = (app) => {
//   app.route(`/`).get(read);
//   app.route(`/login`).post(signin);
//   app.route(`/register`).post(signup);
// };

// export { AkunRoutes };

const { signup } = require("../../controllers/users/CreateController.js");
const { read, signin } = require("../../controllers/users/ReadController.js");

const AkunRoutes = (app) => {
  app.route(`/`).get(read);
  app.route(`/login`).post(signin);
  app.route(`/register`).post(signup);
};

module.exports = { AkunRoutes };
