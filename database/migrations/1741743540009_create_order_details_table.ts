import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "order_details";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("product_id").unsigned();
      table.decimal("quantity");
      table.decimal("price");

      table.timestamp("created_at");
      table.timestamp("updated_at");

      table.foreign("product_id").references("id").inTable("products");
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
