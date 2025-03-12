import { DateTime } from "luxon";
import { BaseModel, belongsTo, column } from "@adonisjs/lucid/orm";
import Product from "./product.js";
import type { BelongsTo } from "@adonisjs/lucid/types/relations";
import Category from "./category.js";

export default class OrderDetail extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare productId: number;

  @column()
  declare quantity: number;

  @column()
  declare price: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  // Relation ShipsProduct
  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>;
}
