import { DateTime } from "luxon";
import { BaseModel, column } from "@adonisjs/lucid/orm";

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare backgroundColor: string;

  @column()
  declare icon: string;

  @column()
  declare label: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
