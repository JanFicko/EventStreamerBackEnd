let Post = require('../models/post');

class PostController  {

    static createPost(eventId, comment, callback){
        // TODO: Insert into DB
        //let post = new Post(undefined, comment);
        callback({success:true});
    }

    static updatePost(postId, eventId, comment, callback){
        // TODO: Update post into DB
        callback({success:true});
    }
    static deletePost(postId, callback){
        // TODO: Delete post
        callback({success:true});
    }

    static findPostsByEventId(eventId, callback) {
        // TODO: Find post from DB by event ID
        callback([
            {postId: 1, comment: "Komentar 1"},
            {postId: 2, comment: "Komentar 2"},
            {postId: 3, comment: "Komentar 3"},
            {postId: 4, comment: "Komentar 4"},
            {postId: 5, comment: "Komentar 5"},
            {postId: 6, comment: "Komentar 6"}
        ]);
    }

}

module.exports = PostController;
