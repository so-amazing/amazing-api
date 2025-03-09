import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "products";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("user_id");
      table.integer("shop_id");
      table.integer("category_id");
      table.string("name");
      table.text("description").nullable();
      table.json("images").nullable();
      table.decimal("price");
      table.boolean("is_negotiable");
      table.integer("views").nullable();

      table.timestamp("created_at");
      table.timestamp("updated_at");
      // relationships
      table.foreign("user_id").references("id").inTable("users");
      table.foreign("category_id").references("id").inTable("categories");
      table.foreign("shop_id").references("id").inTable("shops");
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
