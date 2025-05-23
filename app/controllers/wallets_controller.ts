import Wallet from "#models/wallet";
import type { HttpContext } from "@adonisjs/core/http";

export default class WalletsController {
  public async index() {}

  public async store({ request, response }: HttpContext) {
    const { userId } = request.body();
    const wallet = await Wallet.create({
      userId: userId,
      balance: 0,
      points: 0,
    });
    return response.json({
      message: "Successfully created wallet",
      data: wallet,
    });
  }
}
