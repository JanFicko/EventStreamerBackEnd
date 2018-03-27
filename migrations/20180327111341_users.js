
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable("user", (table)=> {
          table.increments("userId").primary();
          table.text("email").notNullable();
          table.text("password").notNullable();
          table.datetime("timeCreated").notNullable();
          table.datetime("timeUpdated");
        })
    ])
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("user");
};
