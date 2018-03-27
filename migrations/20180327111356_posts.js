
exports.up = function(knex, Promise) {
    return knex.schema.createTable("post", (table) => {
        table.increments("postId").primary();
        table.text("comment").notNullable();
        table.datetime("timeCreated").notNullable();
        table.datetime("timeUpdated");
        table.integer("eventId").references("event.id");
        table.integer("userId").references("user.id");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("post");
};
