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

const OrdersController = () => import("#controllers/orders_controller");
// Register Api Routes
import AutoSwagger from "adonis-autoswagger";
import swagger from "#config/swagger";

// returns swagger in YAML
router.get("/swagger", async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger);
});

// Renders Swagger-UI and passes YAML-output of /swagger
router.get("/docs", async () => {
  //return AutoSwagger.default.ui("/swagger", swagger);
  return AutoSwagger.default.scalar("/swagger"); //to use Scalar instead. If you want, you can pass proxy url as second argument here.
  //return AutoSwagger.default.rapidoc("/swagger", "view"); // to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
});

router
  .group(() => {
    router.resource("users", UsersController).apiOnly();
    router.resource("categories", CategoriesController).apiOnly();
    router.resource("products", ProductsController).apiOnly();
    router.resource("shops", ShopsController).apiOnly();
    router.resource("orders", OrdersController).apiOnly();
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
  .prefix("/api/auth");
