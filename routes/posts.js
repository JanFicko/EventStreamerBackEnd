const express = require('express');
const app = express();
const router = express.Router();
const PostController = require('../controllers/postController');
const server = require("http").createServer(app);
//const http = require('http').Server(app);
//const io = require('socket.io')(http);
const io = require('socket.io').listen(server);
const fs = require("fs");
const multer = require('multer');

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


//io.on("connection", (socket) => {
    /* CREATE */
    // objava
    router.route('/').post(upload.single("slika"), async (req, res, next) => {
        const {id_dogodek, komentar} = req.body;

        console.log(req.body);

        if (!id_dogodek) {
            res.status(400).send({success:false, status: "Data not received"});
        } else {
            let imageName = null;
            if(req.file){
                imageName = req.file.filename;
            }

            const createPostResponse = await PostController.createPost(komentar, imageName, id_dogodek);
            if(!createPostResponse.success){
                res.status(406);
            } else {
                let post = createPostResponse.post;

                if(req.file){
                    let path = "public/uploads/"+id_dogodek;
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


//});

    // like
    router.route('/like').post(async (req, res, next) => {
        const {id_uporabnik, id_dogodek, id_objava} = req.body;

        if (!id_dogodek || !id_objava || !id_uporabnik) {
            res.status(400).send({success:false, status: "Data not received"});
        } else {
            const createPostResponse = await PostController.createLike(id_dogodek, id_objava, id_uporabnik);
            if(!createPostResponse.success){
                res.status(406);
            } else {
                res.status(201);
            }
            res.send(createPostResponse);
        }
    });

    /* READ */
    // objave po id dogodka
    router.route('/:eventId').get(async (req, res, next) => {
        const eventId = req.params.eventId;
        if(!eventId){
            res.status(400).send({success:false, status: "Data not received"});
        } else {
            res.status(200).send(await PostController.findPostsByEventId(eventId));
        }
    });

    // vsi likes na objavo
    router.route('/:id_dogodek/:id_objava').get(async (req, res, next) => {
        const id_dogodek = req.params.id_dogodek;
        const id_objava = req.params.id_objava;

        if(!id_dogodek || !id_objava){
            res.status(400).send({success:false, status: "Data not received"});
        } else {
            res.status(200).send(await PostController.getLikesByPost(id_dogodek, id_objava));
        }
    });

    /* UPDATE */
    // objava
    router.route('/').put(async (req, res, next) => {
        const {id_dogodek, objava} = req.body;

        console.log(objava[0]._id);

        if (!id_dogodek || !objava) {
            res.status(400).send({success:false, status: "Data not received"});
        } else {
            const updatePostResponse = await PostController.updatePost(id_dogodek, objava[0]._id, objava);
            if(!updatePostResponse.success){
                res.status(406);
            } else {
                res.status(202);
            }
            res.send(updatePostResponse)
        }
    });

    /* DELETE */
    // objava
    router.route('/').delete(async (req, res, next) => {
        let {id_dogodek, id_objava} = req.body;

        if (!id_dogodek || !id_objava) {
            res.status(400).send({success:false, status: "Data not received"});
        } else {
            const deletePostResponse = await PostController.deletePost(id_dogodek, id_objava);
            if(!deletePostResponse.success){
                res.status(404)
            } else {
                res.status(202);
            }
            res.send(deletePostResponse);
        }
    });

//server.listen(3001);

module.exports = router;
