import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "users";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").notNullable();
      table.string("full_name").nullable();
      table.string("email", 254).unique().notNullable();
      table.string("phone").unique().nullable();
      table.string("password").notNullable();
      table.text("about").nullable();
      table.string("avatar").nullable();
      table.boolean("is_verified_by_mail").nullable().defaultTo(false);
      table.boolean("is_verified_by_org").nullable().defaultTo(false);

      table.timestamp("created_at").notNullable();
      table.timestamp("updated_at").nullable();
      table.string("remember_token").nullable();
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
