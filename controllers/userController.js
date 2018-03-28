let User = require('../models/user');
let validateHelper = require('../helpers/validateHelper');
let database = require('../database/database');

class UserController  {

    static async createUser(email, password){
        if(!validateHelper.validateEmail(email)){
            callback({success:false, status: 'Email not valid'});
            return;
        }

        return await new database.User()
            .save(new User(undefined, email, password, Date.now(), undefined))
            .then(() => {
                return {success:true};
            })
            .catch((error) => {
                return {success:false, status:error};
            });

    }

    static async updateUser(userId, email, password){
        if(!validateHelper.validateEmail(email)){
            callback({success:false, status: 'Email not valid'});
            return;
        }

        // TODO: Update into DB
        //let user = new User(userId, email, password);
        callback({success:true});
    }

    static async deleteUser(userId, callback){
        // TODO: Delete user
        callback({success:true});
    }

    static async getAllUsers(callback) {
        // TODO: Get all users from DB
        callback([
            {userId: 1, email: "jan.ficko@gmail.com"},
            {userId: 2, email: "urban.kos93@gmail.com"},
            {userId: 3, email: "matej.mbssk@gmail.com"}
        ]);
    }

    static async findUserById(userId, callback) {
        new database.User({userId : userId})
            .fetch()
            .then((model) => {
                if(model == null)
                    callback({success: false});
                else
                    callback({success: true, data :model});
            });
    }

    static async findUsersByQuery(query, callback) {
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

module.exports = UserController;
