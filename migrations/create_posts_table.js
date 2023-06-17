exports.up = function (knex) {
   return knex.schema.createTable("posts", function (table) {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.text("content");
      table.timestamp("created_at").defaultTo(knex.fn.now());
   });
};

exports.down = function (knex) {
   return knex.schema.dropTable("posts");
};
