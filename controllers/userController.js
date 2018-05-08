const userModel = require('../models/uporabnik');
const kategorijaModel = require('../models/kategorija');
const ValidateHelper = require('../helpers/validateHelper');
const DatabaseHelper = require('../helpers/databaseHelper');

class UserController  {

    static createUser(json){
        DatabaseHelper.connect();
        if(!ValidateHelper.validateEmail(json.email)){
            return {success:false, status: 'Email not valid'};
        }

        let uporabnik = new userModel.Uporabnik({
            ime: json.ime,
            priimek: json.priimek,
            geslo: json.geslo,
            email: json.email,
            tip: json.tip,
            medij: json.medij
        });


        return uporabnik.save().then(() => {
            return {success: true}
        }).catch((err) => {
            return {success: false, status: err}
        });
    }

    /* VNOS KATEGORIJE */
    static createKategorija(id, json){
        DatabaseHelper.connect();

        return userModel.Uporabnik.findOne({_id: id}).then((dogodek) => {
            for(let kat in json){
                dogodek.kategorija.push(new kategorijaModel.Kategorija({
                    naziv: json[kat].naziv
                }));
            }

            return dogodek.save().then(() => {
                DatabaseHelper.disconnect();
                return {success: true}
            }).catch((err) => {
                DatabaseHelper.disconnect();
                return {success: false, status: err}
            });
        });
    }

    /* LOGIN */
    static loginUser(email, geslo){
        if(!ValidateHelper.validateEmail(email)){
            return {success:false, status: 'Email not valid'};
        }
        DatabaseHelper.connect();

        return userModel.Uporabnik.findOne({email: email, geslo: geslo})
        .then((user) => {
            DatabaseHelper.disconnect();
            if(user){
                return user;
            }else{
                return {success: false, status: 'Wrong data'}
            }
        }).catch(() => {
            return {success: false, status: 'Wrong data'}
        });

    }

    static updateUser(json){
        if(!ValidateHelper.validateEmail(json.email)){
            return {success:false, status: 'Email not valid'};
        }
        DatabaseHelper.connect();

        return userModel.Uporabnik
            .findOne({_id: json._id, email: json.email, geslo: json.geslo})
            .then((user) => {
                user.ime = json.ime;
                user.priimek = json.priimek;
                user.geslo = json.geslo;
                user.email = json.email;
                user.tip = json.tip;
                user.medij = json.medij;
                user.kategorija = json.kategorija;

                return user.save().then(() => {
                    DatabaseHelper.disconnect();
                    return {success: true}
                }).catch((err) => {
                    DatabaseHelper.disconnect();
                    return {success: false, status: "1. "+err}
                });

            }).catch((err) => {
                DatabaseHelper.disconnect();
                return {success: false, status: "2. "+err}
            });
    }

    static deleteUser(userId){
        DatabaseHelper.connect();
        return userModel.Uporabnik.remove({_id: userId}).then(() => {
            DatabaseHelper.disconnect();
            return {success: true}
        }).catch((err) => {
            return {success: false, status: "1. "+err}
        });
    }

    static getAllUsers() {
        DatabaseHelper.connect();
        return userModel.Uporabnik.find(function (err, user) {
            DatabaseHelper.disconnect();
            return user;
        }).catch(() => {
            DatabaseHelper.disconnect();
            return {success: false, status: 'No Data'}
        });
    }

    static findUserById(userId) {
        DatabaseHelper.connect();
        return userModel.Uporabnik.findOne({_id: userId})
        .then((user) => {
            DatabaseHelper.disconnect();
            return user;
        }).catch(() => {
            DatabaseHelper.disconnect();
            return {success: false, status: 'No Data'}
        });

    }

}

module.exports = UserController;
