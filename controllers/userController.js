let User = require('../models/user');
let validateHelper = require('../helpers/validateHelper');
let database = require('../database/database');

class UserController  {

    static createUser(email, password, callback){
        if(!validateHelper.validateEmail(email)){
            callback({success:false, status: 'Email not valid'});
            return;
        }

       /* let newUser = new User(undefined, email, password, Date.now(), undefined);
        new database.User(newUser).save(null, { method: 'insert' });*/

       async function test() {
           let newUser = new User(undefined, email, password, Date.now(), undefined);
           const testuser = await new database.User(newUser).save(null, { method: 'insert' });
        }

        callback({success:true});
    }

    static updateUser(userId, email, password, callback){
        if(!validateHelper.validateEmail(email)){
            callback({success:false, status: 'Email not valid'});
            return;
        }

        // TODO: Update into DB
        //let user = new User(userId, email, password);
        callback({success:true});
    }
    static deleteUser(userId, callback){
        // TODO: Delete user
        callback({success:true});
    }

    static getAllUsers(callback) {
        // TODO: Get all users from DB
        callback([
            {userId: 1, email: "jan.ficko@gmail.com"},
            {userId: 2, email: "urban.kos93@gmail.com"},
            {userId: 3, email: "matej.mbssk@gmail.com"}
        ]);
    }

    static findUserById(userId, callback) {
        new database.User({userId : userId})
            .fetch()
            .then((model) => {
                if(model == null)
                    callback({success: false});
                else
                    callback({success: true, data :model});
            });
    }

    static findUsersByQuery(query, callback) {
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
