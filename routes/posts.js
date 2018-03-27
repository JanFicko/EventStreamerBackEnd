const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

/* CREATE */
router.post('/', function(req, res, next) {
    const { eventId, comment } = req.body;
    if (!eventId || !comment) {
        res.status(400).send({status: 'Data not received'});
    } else {
        postController.createPost(eventId, comment,
            (createPostResponse) => {
                if(!createPostResponse.success){
                    res.status(406).send(createPostResponse);
                } else {
                    res.status(201).send({success: true});
                }
            });
    }
});

/* READ */
router.get('/:id', function(req, res, next) {
    let eventId = parseInt(req.params.id);
    if(isNaN(eventId)){
        res.status(500).send("ID ni stevilo");
    } else {
        postController.findPostsByEventId(eventId,
            (findPostsByEventIdResponse) => {
                res.status(200).send(findPostsByEventIdResponse);
            });
    }
});

/* UPDATE */
router.put('/', function(req, res, next) {
    const { postId, eventId, comment } = req.body;
    if (!postId || !eventId || !comment) {
        res.status(400).send({status: 'Data not received'});
    } else {
        postController.updatePost(postId, eventId, comment,
            (updatePostResponse) => {
                if(!updatePostResponse.success){
                    res.status(406).send(updatePostResponse);
                } else {
                    res.status(202).send({success: true});
                }
            });
    }
});

/* DELETE */
router.delete('/', function(req, res, next) {
    let postId = req.body.postId;
    if (!postId) {
        res.status(400).send({status: 'Data not received'});
    } else if(isNaN(parseInt(postId))){
        res.status(500).send("ID ni stevilo");
    } else {
        postController.deletePost(postId,
            (deletePostResponse) => {
                if(!deletePostResponse.success){
                    res.status(404).send(deletePostResponse);
                } else {
                    res.status(202).send({success: true});
                }
            });
    }
});

module.exports = router;
