import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'shops'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id')
      table.string('name')
      table.string('location')
      table.json('types')
      table.boolean('is_verified')
      table.json('delivery_info')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.foreign('user_id').references('id').inTable('users')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
