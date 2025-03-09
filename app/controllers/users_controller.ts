import User from "#models/user";
import type { HttpContext } from "@adonisjs/core/http";

export default class UsersController {
  async index({ request }: HttpContext) {
    return await User.all();
  }
}
