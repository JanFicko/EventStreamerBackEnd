const objavaModel = require('../models/objava');
const dogodekModel = require('../models/dogodek');
const likeModel = require('../models/like');
const EventController = require('../controllers/eventController');
const UserController = require('../controllers/userController');
const DatabaseHelper = require('../helpers/databaseHelper');

class PostController  {

    /* CREATE */
    // objava
    static createPost(comment, image, id_dogodek){
        DatabaseHelper.connect();

        return dogodekModel.Dogodek
            .findOne({_id: id_dogodek})
            .then((dogodek) => {

                let objava = new objavaModel.Objava({
                    komentar: comment,
                    slika: image,
                    datum: Date.now()
                });

                dogodek.objava.push(objava);

                return dogodek.save().then((dogodek) => {
                    DatabaseHelper.disconnect();
                    return {success: true, post: dogodek};
                }).catch((err) => {
                    DatabaseHelper.disconnect();
                    return {success: false, status: err.errmsg}
                });
            }).catch((err) => {
                DatabaseHelper.disconnect();
                return {success: false, status: err.errmsg};
            });
    }

    // like
    static async createLike(id_dogodek, id_objava, id_uporabnik){
        const user = await UserController.findUserById(id_uporabnik);
        if(!user){
            return {success:false, status: "User does not exist"};
        }

        DatabaseHelper.connect();

        return dogodekModel.Dogodek.findOne({_id: id_dogodek})
        .then((dogodek) => {
            let objava = dogodek.objava.filter(function(objava){
                return objava._id == id_objava;
            });

            let like = objava[0].like.filter((like) => {
                return like.id_uporabnik == id_uporabnik;
            });

            if(!like.length){
                like = new likeModel.Like({
                    id_uporabnik: id_uporabnik,
                    like: true
                });
                objava[0].like.push(like);
            } else {
                like[0].like = !like[0].like;
            }

            return dogodek.save().then((dogodek) => {
                DatabaseHelper.disconnect();
                return {success: true, post: dogodek.objava};
            }).catch((err) => {
                DatabaseHelper.disconnect();
                return {success: false, status: err.errmsg}
            });
        }).catch((err) => {
            return {success: false, status: err.errmsg};
        });
    }

    /* UPDATE */
    // objava
    static updatePost(id_dogodek, id_objava, objava){
        DatabaseHelper.connect();

        return dogodekModel.Dogodek.findOne({_id: id_dogodek})
            .then((dogodek) => {

                let novaObjava = dogodek.objava.filter(function(objava){
                    return objava._id == id_objava;
                });

                novaObjava[0].komentar = objava[0].komentar;

                return DatabaseHelper.saveToDatabase(dogodek);
            }).catch((err) => {
                DatabaseHelper.disconnect();
                return {success: false, status: err.errmsg};
            });

    }

    /* DELETE */
    // objava
    static deletePost(id_dogodek, id_objava){
        DatabaseHelper.connect();

        return objavaModel.Objava
                .remove({_id: id_objava})
                .then(() => {
                    DatabaseHelper.disconnect();
                        return {success: true};
                }).catch((err) => {
                    DatabaseHelper.disconnect();
                    return {success: false, status: err.errmsg};
                });

    }

    /* GET */
    // objave by id dogodek
    static async findPostsByEventId(eventId) {
        DatabaseHelper.connect();

        return dogodekModel.Dogodek
            .findOne({_id: eventId})
            .then((dogodek) => {
                DatabaseHelper.disconnect();

                if(dogodek.objava){
                    return dogodek.objava;
                }else {
                    return {success: false, status: "Objava not found"}
                }

            }).catch((err) => {
                DatabaseHelper.disconnect();
                return {success: false, status: err};
            });
    }

    static getLikesByPost(id_dogodek, id_objava){
        DatabaseHelper.connect();

        return dogodekModel.Dogodek
            .findOne({_id: id_dogodek})
            .then((dogodek) => {

                let objava = dogodek.objava.filter(function(objava){
                    return objava._id == id_objava;
                });

                DatabaseHelper.disconnect();

                return objava[0].like;

        }).catch((err) => {
            DatabaseHelper.disconnect();
            return {success: false, status: "1. "+err};
        });
    }

}

module.exports = PostController;
