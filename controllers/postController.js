const objavaModel = require('../models/objava');
const dogodekModel = require('../models/dogodek');
const likeModel = require('../models/like');
const EventController = require('../controllers/eventController');
const UserController = require('../controllers/userController');
const DatabaseHelper = require('../helpers/databaseHelper');

class PostController  {

    /* CREATE */
    // objava
    static async createPost(comment, image, eventId, id_uporabnik){
        const event = await EventController.findEventById(eventId);
        if(!event){
            return {success:false, status: "Event does not exist"};
        }

        DatabaseHelper.connect();

        return dogodekModel.Dogodek.findOne({_id: eventId})
            .then((dogodek) => {
                dogodek.objava.push(new objavaModel.Objava({
                    komentar: comment,
                    slika: image
                }));

                return DatabaseHelper.saveToDatabase(dogodek);

            }).catch((err) => {
                DatabaseHelper.disconnect();
                return {success: false};
            });
    }

    // like
    static async createLike(id_dogodek, id_objava, id_uporabnik){
        const event = await EventController.findEventById(id_dogodek);
        if(!event){
            return {success:false, status: "Event does not exist"};
        }

        const user = await UserController.findUserById(id_uporabnik);
        if(!user){
            return {success:false, status: "User does not exist"};
        }

        DatabaseHelper.connect();

        return dogodekModel.Dogodek.findOne({_id: id_dogodek}).then((dogodek) => {
            let objava = dogodek.objava.filter(function(objava){
                return objava._id == id_objava;
            });

            let like = objava[0].like.filter((like) => {
                return like.id_uporabnik == id_uporabnik;
            });

            if(!like.length){
                objava[0].like.push(new likeModel.Like({
                    id_uporabnik: id_uporabnik,
                    like: true
                }));

            }else{
                if(like[0].like){
                    like[0].like = false;
                }else{
                    like[0].like = true;
                }
            }

            return DatabaseHelper.saveToDatabase(dogodek);

        }).catch((err) => {
            return {success: false, status: "1. "+err};
        });
    }

    /* UPDATE */
    // objava
    static async updatePost(json){
        const event = await EventController.findEventById(json.id_dogodek);
        if(!event){
            return {success: false, status: "Event does not exist"};
        }
        DatabaseHelper.connect();

        return dogodekModel.Dogodek.findOne({_id: json.id_dogodek})
            .then((dogodek) => {
                let objava = dogodek.objava.filter(function(objava){
                    return objava._id == json.id_objava;
                });

                objava[0].komentar = json.objava.komentar;
                console.log(objava);

                return DatabaseHelper.saveToDatabase(dogodek);

            }).catch((err) => {
                DatabaseHelper.disconnect();
                return {success: false};
            });

    }

    /* DELETE */
    // objava
    static deletePost(json){
        DatabaseHelper.connect();
        return dogodekModel.Dogodek.findOne({_id: json.id_dogodek})
            .then((dogodek) => {
                let objava = dogodek.objava.filter(function(objava){
                    return objava._id != json.id_objava;
                });
                dogodek.objava = objava;

                DatabaseHelper.saveToDatabase(dogodek);
            return {success: true}
        }).catch((err) => {
            DatabaseHelper.disconnect();
            return {success: false, status: "1. "+err}
        });
    }

    /* GET */
    // objave by id dogodek
    static async findPostsByEventId(eventId) {
        const event = await EventController.findEventById(eventId);
        if(!event){
            return {success: false, status: "Event does not exist"};
        }
        DatabaseHelper.connect();

        return dogodekModel.Dogodek.find({_id: eventId})
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

    static async getLikesByPost(id_dogodek, id_objava){
        const event = await EventController.findEventById(id_dogodek);
        if(!event){
            return {success:false, status: "Event does not exist"};
        }
        DatabaseHelper.connect();

        return dogodekModel.Dogodek.findOne({_id: id_dogodek}).then((dogodek) => {
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
