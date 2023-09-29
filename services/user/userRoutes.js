import { signup } from "../../controllers/users/CreateController.js";
import { read, signin } from "../../controllers/users/ReadController.js";

const AkunRoutes = (app) => {
  app.route(`/`).get(read);
  app.route(`/login`).post(signin);
  app.route(`/register`).post(signup);
};

export { AkunRoutes };
