const knex = require('knex')(require('../knexfile').development);
const bookshelf = require('bookshelf')(knex);
let User = require('../models/user');
let Post = require('../models/post');

class Event {
    constructor(eventId, name, timeCreated, timeUpdated, userId) {
        this.eventId = eventId;
        this.name = name;
        this.timeCreated = timeCreated;
        this.timeUpdated = timeUpdated;
        this.userId = userId;
    }
}

Event.eventModel = bookshelf.Model.extend({
    tableName: 'event',
    idAttribute: 'id',
    user: function() {
        return this.hasOne(User.userModel, "userId");
    },
    post: function() {
        return this.belongsTo(Post.postModel, "postIdId");
    }
});

module.exports = Event;