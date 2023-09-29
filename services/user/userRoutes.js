import { signup } from "../../controllers/users/CreateController.js";
import { signin } from "../../controllers/users/ReadController.js";

const AkunRoutes = (app) => {
  app.route(`/api/v1/users/login`).post(signin);
  app.route(`/api/v1/users/register`).post(signup);
};

export { AkunRoutes };
