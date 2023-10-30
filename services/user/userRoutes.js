// import { signup } from "../../controllers/users/CreateController.js";
// import { read, signin } from "../../controllers/users/ReadController.js";

// const AkunRoutes = (app) => {
//   app.route(`/`).get(read);
//   app.route(`/login`).post(signin);
//   app.route(`/register`).post(signup);
// };

// export { AkunRoutes };

const { signup, update } = require("../../controllers/users/CreateController.js");
const { read, signin, readlist } = require("../../controllers/users/ReadController.js");
const authentication = require("../../middleware/authentication.js");

const AkunRoutes = (app) => {
  app.route(`/`).get(read);
  app.route(`/login`).post(signin);
  app.route(`/profil`).get(authentication, readlist);
  app.route(`/register`).post(signup);
  app.route(`/update`).put(authentication, update);
};

module.exports = AkunRoutes;
