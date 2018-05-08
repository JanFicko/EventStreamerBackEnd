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
    // objava
    router.route('/').post(upload.single("image"),  async (req, res, next) => {
        const json = req.body;
        if (!json.id_dogodek) {
            res.status(400).send({success:false, status: "Data not received"});
        } else {
            let imageName = null;
            if(req.file){
                imageName = req.filRe.filename;
            }

            const createPostResponse = await PostController.createPost(json.komentar, imageName, json.id_dogodek);
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

    // like
    router.route('/like').post(async (req, res, next) => {
        const id_uporabnik = req.body.id_uporabnik;
        const id_dogodek = req.body.id_dogodek;
        const id_objava = req.body.id_objava;

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
            res.status(400).send({success:false, status: "data not recieved"});
        } else {
            res.status(200).send(await PostController.findPostsByEventId(eventId));
        }
    });

    // vsi likes na objavo
    router.route('/:id_dogodek/:id_objava').get(async (req, res, next) => {
        const id_dogodek = req.params.id_dogodek;
        const id_objava = req.params.id_objava;

        if(!id_dogodek || !id_objava){
            res.status(400).send({success:false, status: "data not recieved"});
        } else {
            res.status(200).send(await PostController.getLikesByPost(id_dogodek, id_objava));
        }
    });

    /* UPDATE */
    // objava
    router.route('/').put(async (req, res, next) => {
        const json = req.body;

        if (!json.objava || !json.id_dogodek || !json.id_objava) {
            res.status(400).send({success:false, status: "Data not received"});
        } else {
            const updatePostResponse = await PostController.updatePost(json);
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
        let json = req.body;

        if (!json) {
            res.status(400).send({success:false, status: "Data not received"});
        } else {
            const deletePostResponse = await PostController.deletePost(json);
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
