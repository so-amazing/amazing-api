import Product from "#models/product";
import {
  createProductValidator,
  updateProductValidator,
} from "#validators/product";
import type { HttpContext } from "@adonisjs/core/http";

export default class ProductsController {
  // Show all products
  public async index({ response }: HttpContext) {
    const products = await Product.query().preload("category").preload("shop");
    return response.json(products);
  }

  // Show a single product
  public async show({ params, response }: HttpContext) {
    const product = await Product.query()
      .where("id", params.id)
      .preload("category")
      .preload("shop")
      .first();

    if (!product) {
      return response.status(404).json({ message: "Product not found" });
    }

    return response.json(product);
  }

  // Create a new product
  public async store({ request, response, auth }: HttpContext) {
    if (!auth.user) {
      return response.status(401).json({ message: "Unathorized" });
    }

    const payload = await request.validateUsing(createProductValidator);

    const product = await Product.create({ ...payload, userId: auth.user.id });

    return response.status(201).json(product);
  }

  // Update an existing product
  public async update({ params, request, response }: HttpContext) {
    const product = await Product.find(params.id);

    if (!product) {
      return response.status(404).json({ message: "Product not found" });
    }

    const payload = await request.validateUsing(updateProductValidator);

    product.merge(payload);
    await product.save();

    return response.json(product);
  }

  // Delete a product
  public async destroy({ params, response }: HttpContext) {
    const product = await Product.find(params.id);

    if (!product) {
      return response.status(404).json({ message: "Product not found" });
    }

    await product.delete();

    return response.status(204).json({ message: "Product deleted" });
  }
}
