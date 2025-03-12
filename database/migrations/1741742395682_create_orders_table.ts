import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "orders";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("user_id").unsigned();
      table.string("order_number");
      table.string("status");
      table.boolean("seen_by_admin").defaultTo(false);

      table.timestamp("created_at");
      table.timestamp("updated_at");

      table.foreign("user_id").references("id").inTable("users");
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
