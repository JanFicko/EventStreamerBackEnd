const knex = require('knex')(require('../knexfile').development);
const bookshelf = require('bookshelf')(knex);

const User = bookshelf.Model.extend({
    tableName: 'user',
    idAttribute: 'id',
    event: function() {
        return this.belongsTo(Event);
    },
    post: function() {
        return this.belongsTo(Post);
    }
});

const Event = bookshelf.Model.extend({
    tableName: 'event',
    idAttribute: 'id',
    user: function() {
        return this.hasOne(User);
    },
    post: function() {
        return this.belongsTo(Post);
    }
});

const Post = bookshelf.Model.extend({
    tableName: 'post',
    idAttribute: 'id',
    event: function() {
        return this.hasOne(Event);
    },
    user: function() {
        return this.hasOne(User);
    }
});

module.exports = {User, Event, Post};