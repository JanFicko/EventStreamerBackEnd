const express = require('express');
const app = express();
const router = express.Router();
const PostController = require('../controllers/postController');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require("fs");
const multer = require('multer');

io.on("connection", (socket) => {

    let storage = multer.diskStorage({
        destination: function (req, file, cb){
            cb(null, "public/uploads/");
        },
        filename: function (req, file, cb){
            cb(null, Date.now() + ".png");
        }
    });
    let upload = multer({
        storage: storage
    });

    /* CREATE */
    router.route('/').post(upload.single("image"), async (req, res, next) => {
        const { comment, eventId} = req.body;
        if (!eventId) {
            res.status(400).send({success:false, status: "Data not received"});
        } else if(isNaN(parseInt(eventId))){
            res.status(500).send({success:false, status: "ID is not a number"});
        } else {
            let imageName = null;
            if(req.file){
                imageName = req.file.filename;
            }

            const createPostResponse = await PostController.createPost(comment, imageName, eventId);
            if(!createPostResponse.success){
                res.status(406);
            } else {
                let post = createPostResponse.post;

                if(req.file){
                    let path = "public/uploads/"+req.body.eventId;
                    if(!fs.existsSync(path)){
                        try {
                            fs.mkdirSync(path);
                        } catch (error){
                            console.log(error);
                        }
                    }
                    fs.rename("public/uploads/"+req.file.filename, path+"/"+req.file.filename, function(error) {
                        console.log(error);
                    });
                }

                io.emit('post', post);
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


});

const port = process.env.PORT || 3001;

http.listen(port, function(){
    console.log('listening in http://localhost:' + port);
});

module.exports = router;
