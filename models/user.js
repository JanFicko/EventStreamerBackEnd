const knex = require('knex')(require('../knexfile').development);
const bookshelf = require('bookshelf')(knex);
let Event = require('../models/event');
let Post = require('../models/post');

class User {
    constructor(userId, email, password, timeCreated, timeUpdated) {
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.timeCreated = timeCreated;
        this.timeUpdated = timeUpdated;
    }
}

User.userModel = bookshelf.Model.extend({
    tableName: 'user',
    idAttribute: 'id',
    event: function() {
        return this.belongsTo(Event.eventModel, "eventId");
    }
});

module.exports = User;