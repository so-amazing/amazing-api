import Category from "#models/category";
import {
  createCategoryValidator,
  updateCategoryValidator,
} from "#validators/category";
import type { HttpContext } from "@adonisjs/core/http";

export default class CategoriesController {
  // Show all categories
  public async index({ response }: HttpContext) {
    const categories = await Category.all();
    return response.json(categories);
  }

  // Create a new category
  public async store({ request, response }: HttpContext) {
    // Validate the incoming request data
    const payload = await request.validateUsing(createCategoryValidator);

    // Create and save the new category
    const category = await Category.create(payload);

    return response.status(201).json(category);
  }

  // Show a single category
  public async show({ params, response }: HttpContext) {
    const category = await Category.find(params.id);

    if (!category) {
      return response.status(404).json({ message: "Category not found" });
    }

    return response.json(category);
  }

  // Update an existing category
  public async update({ params, request, response }: HttpContext) {
    const category = await Category.find(params.id);

    if (!category) {
      return response.status(404).json({ message: "Category not found" });
    }

    // Validate the update data
    const payload = await request.validateUsing(updateCategoryValidator);

    // Merge the new values into the category and save it
    category.merge(payload);
    await category.save();

    return response.json(category);
  }

  // Delete a category
  public async destroy({ params, response }: HttpContext) {
    const category = await Category.find(params.id);

    if (!category) {
      return response.status(404).json({ message: "Category not found" });
    }

    await category.delete();

    return response.status(204).json({ message: "Category deleted" });
  }
}
