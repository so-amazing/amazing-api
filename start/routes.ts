/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import("#controllers/users_controller");
import router from "@adonisjs/core/services/router";
import { middleware } from "./kernel.js";

router
  .group(() => {
    router.resource("user", UsersController).apiOnly();
  })
  .prefix("api")
  .use(
    middleware.auth({
      guards: ["api"],
    }),
  );
