import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = "payments";

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("order_id").unsigned();
      table.double("amount");
      table.string("transaction_id");
      table.jsonb("payment_details").nullable();

      table.timestamp("created_at");
      table.timestamp("updated_at");

      table.foreign("order_id").references("id").inTable("orders");
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
