
exports.up = function(knex, Promise) {
    return knex.schema.createTable("event", (table)=> {
        table.increments("eventId").primary();
        table.text("name").notNullable();
        table.datetime("timeCreated").notNullable();
        table.datetime("timeUpdated");
        table.integer("userId").references("user.id");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("event");
};
