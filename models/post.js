const knex = require('knex')(require('../knexfile').development);
const bookshelf = require('bookshelf')(knex);
let Event = require('../models/event');
let User = require('../models/user');

class Post {
    constructor(postId, comment, timeCreated, timeUpdated, eventId) {
        this.postId = postId;
        this.comment = comment;
        this.timeCreated = timeCreated;
        this.timeUpdated = timeUpdated;
        this.eventId = eventId;
    }
}

Post.postModel = bookshelf.Model.extend({
    tableName: 'post',
    idAttribute: 'id',
    event: function() {
        return this.hasOne(Event.eventModel, "eventId");
    }
});

module.exports = Post;