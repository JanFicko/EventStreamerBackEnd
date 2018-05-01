let Post = require('../models/post');
let EventController = require('../controllers/eventController');
let UserController = require('../controllers/userController');

class PostController  {

    static async createPost(comment, eventId){
        const event = await EventController.findEventById(eventId);
        if(!event){
            return {success:false, status:"Event does not exist"};
        }

        return new Post.postModel()
            .save(new Post(undefined, comment, Date.now(), undefined, eventId), {method:"insert"})
            .then((data) => {
                return {success:true, post: data};
            })
            .catch((error) => {
                return {success:false, status:error};
            });
    }

    static updatePost(comment, postId){
        return new Post.postModel()
            .where("postId", "=", postId)
            .save(new Post(postId, comment, undefined, Date.now(), undefined, undefined), {method:"update", patch: true})
            .then(() => {
                return {success:true};
            })
            .catch((error) => {
                return {success:false, status:error};
            });
    }
    static deletePost(postId){
        return new Post.postModel()
            .where("postId", "=", postId)
            .destroy()
            .then(() => {
                return {success:true};
            })
            .catch((error) => {
                return {success:false, status:error};
            });
    }

    static findPostsByEventId(eventId) {
        return new Post.postModel()
            .where("eventId", "=", eventId)
            .fetchAll()
            .then((posts) => {
                return posts;
            })
            .catch((error) => {
                return {success:false, status:error};
            });
    }

}

module.exports = PostController;
