import { DateTime } from "luxon";
import { BaseModel, belongsTo, column, hasMany } from "@adonisjs/lucid/orm";
import OrderDetail from "./order_detail.js";
import User from "./user.js";
import type { BelongsTo, HasMany } from "@adonisjs/lucid/types/relations";

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare userId: number;

  @column()
  declare orderNumber: string;

  @column()
  declare status: string;

  @column()
  declare seenByAdmin: boolean;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

  @hasMany(() => OrderDetail)
  declare orderDetails: HasMany<typeof OrderDetail>;
}
