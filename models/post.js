class Post {
    constructor(postId, eventId, comment, timeCreated, timeUpdated) {
        this.postId = postId;
        this.eventId = eventId;
        this.comment = comment;
        this.timeCreated = timeCreated;
        this.timeUpdated = timeUpdated;
    }
}
module.exports = Post;