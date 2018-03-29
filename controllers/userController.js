let User = require('../models/user');
let validateHelper = require('../helpers/validateHelper');

class UserController  {

    static createUser(email, password){
        if(!validateHelper.validateEmail(email)){
            return {success:false, status: 'Email not valid'};
        }

        return new User.userModel()
            .save(new User(undefined, email, password, Date.now(), undefined), {method:"insert"})
            .then(() => {
                return {success:true};
            })
            .catch((error) => {
                return {success:false, status:error};
            });

    }
    static loginUser(email, password){
        if(!validateHelper.validateEmail(email)){
            return {success:false, status: 'Email not valid'};
        }

        return new User.userModel()
            .where("email", "=", email)
            .where("password", "=", password)
            .fetch()
            .then((user) => {
                return user;
            })
            .catch(() => {
                return {success:false, status:"Wrong user data"};
            });

    }

    static updateUser(userId, email, password){
        if(!validateHelper.validateEmail(email)){
            return {success:false, status: 'Email not valid'};
        }
        return new User.userModel()
            .where("userId", "=", userId)
            .save(new User(userId, email, password, undefined, Date.now()), {method:"update", patch: true})
            .then(() => {
                return {success:true};
            })
            .catch((error) => {
                return {success:false, status:error};
            });
    }

    static deleteUser(userId){
        return new User.userModel()
            .where("userId", "=", userId)
            .destroy()
            .then(() => {
                return {success:true};
            })
            .catch((error) => {
                return {success:false, status:error};
            });
    }

    static getAllUsers() {
        return new User.userModel()
            .fetchAll()
            .then((users) => {
                return users;
            })
            .catch((error) => {
                return {success:false, status:error};
            });
    }

    static findUserById(userId) {
        return new User.userModel()
            .where("userId", "=", userId)
            .fetch()
            .then((user) => {
                return user;
            })
            .catch((error) => {
                return {success:false, status:error};
            });
    }

}

module.exports = UserController;
