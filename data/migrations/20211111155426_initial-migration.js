
exports.up = function(knex) {
  return knex.schema.createTable('jokes', table => {
      table.increments("joke_id")
      table.string("description", 255).notNullable()
      table.string("photos", 255).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("jokes")
};
