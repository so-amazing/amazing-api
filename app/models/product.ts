import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, hasMany } from "@adonisjs/lucid/orm";
import User from "./user.js";
import Shop from "./shop.js";
import Category from "./category.js";
import type { BelongsTo, HasMany } from "@adonisjs/lucid/types/relations";
import OrderDetail from "./order_detail.js";

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare userId: number;

  @column()
  declare shopId: number;

  @column()
  declare categoryId: number;

  @column()
  declare name: string;

  @column()
  declare description: string | null;

  @column()
  declare images: object | null;

  @column()
  declare price: number;

  @column()
  declare isNegotiable: boolean;

  @column()
  declare views: number | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

  @belongsTo(() => Shop)
  declare shop: BelongsTo<typeof Shop>;

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>;

  @hasMany(() => OrderDetail)
  declare orderDetails: HasMany<typeof OrderDetail>;
}
