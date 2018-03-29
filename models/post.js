const knex = require('knex')(require('../knexfile').development);
const bookshelf = require('bookshelf')(knex);
let Event = require('../models/event');
let User = require('../models/user');

class Post {
    constructor(postId, comment, timeCreated, timeUpdated, eventId, userId) {
        this.postId = postId;
        this.comment = comment;
        this.timeCreated = timeCreated;
        this.timeUpdated = timeUpdated;
        this.eventId = eventId;
        this.userId = userId;
    }
}

Post.postModel = bookshelf.Model.extend({
    tableName: 'post',
    idAttribute: 'id',
    event: function() {
        return this.hasOne(Event.eventModel, "eventId");
    },
    user: function() {
        return this.hasOne(User.userModel, "userId");
    }
});

module.exports = Post;