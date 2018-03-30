const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');

/* CREATE */
router.route('/').post(async (req, res, next) => {
    const { comment, eventId, userId } = req.body;
    if (!comment || !eventId || !userId) {
        res.status(400).send({success:false, status: "Data not received"});
    } else if(isNaN(parseInt(eventId)) || isNaN(parseInt(eventId))){
        res.status(500).send({success:false, status: "ID is not a number"});
    } else {
        const createPostResponse = await PostController.createPost(comment, eventId, userId);
        if(!createPostResponse.success){
            res.status(406);
        } else {
            res.status(201);
        }
        res.send(createPostResponse);
    }
});

/* READ */
router.route('/:eventId').get(async (req, res, next) => {
    let eventId = parseInt(req.params.eventId);
    if(isNaN(eventId)){
        res.status(400).send({success:false, status: "ID is not a number"});
    } else {
        res.status(200).send(await PostController.findPostsByEventId(eventId));
    }
});

/* UPDATE */
router.route('/').put(async (req, res, next) => {
    const { comment, postId  } = req.body;
    if (!comment || !postId) {
        res.status(400).send({success:false, status: "Data not received"});
    } else if(isNaN(parseInt(postId))){
        res.status(500).send({success:false, status: "ID is not a number"});
    } else {
        const updatePostResponse = await PostController.updatePost(comment, postId);
        if(!updatePostResponse.success){
            res.status(406);
        } else {
            res.status(202);
        }
        res.send(updatePostResponse)
    }
});

/* DELETE */
router.route('/').delete(async (req, res, next) => {
    let postId = req.body.postId;
    if (!postId) {
        res.status(400).send({success:false, status: "Data not received"});
    } else if(isNaN(parseInt(postId))){
        res.status(500).send({success:false, status: "ID is not a number"});
    } else {
        const deletePostResponse = await PostController.deletePost(postId);
        if(!deletePostResponse.success){
            res.status(404)
        } else {
            res.status(202);
        }
        res.send(deletePostResponse);
    }
});

module.exports = router;
