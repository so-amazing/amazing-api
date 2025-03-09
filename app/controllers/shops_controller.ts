import Shop from "#models/shop";
import { createShopValidator, updateShopValidator } from "#validators/shop";
import type { HttpContext } from "@adonisjs/core/http";

export default class ShopsController {
  // Show all shops
  public async index({ response }: HttpContext) {
    const shops = await Shop.all();
    return response.json(shops);
  }

  // Create a new shop
  public async store({ request, response, auth }: HttpContext) {
    if (!auth.user) {
      return response.status(401).json({ message: "Unathorized" });
    }
    // Use the validator to check the input data
    const payload = await request.validateUsing(createShopValidator);

    // Create the shop
    const shop = await Shop.create({ ...payload, userId: auth.user.id });

    return response.status(201).json(shop);
  }

  // Show a single shop
  public async show({ params, response }: HttpContext) {
    const shop = await Shop.find(params.id);

    if (!shop) {
      return response.status(404).json({ message: "Shop not found" });
    }

    return response.json(shop);
  }

  // Update an existing shop
  public async update({ params, request, response, auth }: HttpContext) {
    const shop = await Shop.find(params.id);

    if (!shop) {
      return response.status(404).json({ message: "Shop not found" });
    }
    if (!auth.user) {
      return response.status(401).json({ message: "Unathorized" });
    }

    // Ensure the shop belongs to the authenticated user
    if (shop.userId !== auth.user.id) {
      return response.status(403).json({ message: "You do not own this shop" });
    }

    // Validate the update input
    const payload = await request.validateUsing(updateShopValidator);

    // Merge the new values into the shop and save it
    shop.merge(payload);
    await shop.save();

    return response.json(shop);
  }

  // Delete a shop
  public async destroy({ params, response, auth }: HttpContext) {
    const shop = await Shop.find(params.id);

    if (!shop) {
      return response.status(404).json({ message: "Shop not found" });
    }
    if (!auth.user) {
      return response.status(401).json({ message: "Unathorized" });
    }

    // Ensure the shop belongs to the authenticated user
    if (shop.userId !== auth.user.id) {
      return response.status(403).json({ message: "You do not own this shop" });
    }

    await shop.delete();

    return response.status(204).json({ message: "Shop deleted" });
  }
}
