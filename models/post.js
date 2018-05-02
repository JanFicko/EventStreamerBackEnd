const knex = require('knex')(require('../knexfile').development);
const bookshelf = require('bookshelf')(knex);
let Event = require('../models/event');

class Post {
    constructor(postId, comment, image, timeCreated, timeUpdated, eventId) {
        this.postId = postId;
        this.comment = comment;
        this.image = image;
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