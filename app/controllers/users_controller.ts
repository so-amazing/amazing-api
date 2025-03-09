import User from "#models/user";
import { createUserValidator, updateUserValidator } from "#validators/user";
import type { HttpContext } from "@adonisjs/core/http";

export default class UsersController {
  async index({ request }: HttpContext) {
    return await User.all();
  }

  async store({ request }: HttpContext) {
    const body = await request.validateUsing(createUserValidator);
    return await User.create(body);
  }

  async show({ params }: HttpContext) {
    return await User.findOrFail(params.id);
  }

  async update({ request, params }: HttpContext) {
    const user = await User.findOrFail(params.id);
    const body = await request.validateUsing(updateUserValidator);
    return await user.merge(body).save();
  }

  async delete({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id);
    await user.delete();
    return response.status(204).json({ message: "User Deleted Successfully" });
  }
}
