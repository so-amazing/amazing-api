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
const AuthController = () => import("#controllers/auth_controller");
const CategoriesController = () => import("#controllers/categories_controller");
const ProductsController = () => import("#controllers/products_controller");
const ShopsController = () => import("#controllers/shops_controller");

router
  .group(() => {
    router.resource("user", UsersController).apiOnly();
    router.resource("categories", CategoriesController).apiOnly();
    router.resource("products", ProductsController).apiOnly();
    router.resource("shops", ShopsController).apiOnly();
  })
  .prefix("api")
  .use(
    middleware.auth({
      guards: ["api"],
    }),
  );

router
  .group(() => {
    router.post("/login", [AuthController, "login"]);
    router.post("/register", [AuthController, "register"]);
    router.post("/forgot-password", [AuthController, "forgotPassword"]);
    router.post("/confirm-remember-token", [
      AuthController,
      "confirmResetToken",
    ]);
    router.post("/reset-password", [AuthController, "resetPassword"]);
  })
  .prefix("/api");
