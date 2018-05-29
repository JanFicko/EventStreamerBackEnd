const userModel = require('../models/uporabnik');
const kategorijaModel = require('../models/kategorija');
const ValidateHelper = require('../helpers/validateHelper');
const DatabaseHelper = require('../helpers/databaseHelper');

class UserController  {

    static createUser(ime, priimek, geslo, email, tip, medij){
        if(!ValidateHelper.validateEmail(email)){
            return {success:false, status: 'Email not valid'};
        }

        DatabaseHelper.connect();

        let uporabnik = new userModel.Uporabnik({
            ime: ime,
            priimek: priimek,
            geslo: geslo,
            email: email,
            tip: tip,
            medij: medij
        });

        return uporabnik.save().then(() => {
            DatabaseHelper.disconnect();
            return {success: true}
        }).catch((err) => {
            DatabaseHelper.disconnect();
            return {success: false, status: err.errmsg}
        });
    }

    /* VNOS KATEGORIJE */
    static createKategorija(id, kategorija){
        DatabaseHelper.connect();

        return userModel.Uporabnik.findOne({_id: id}).then((dogodek) => {
            for(let kat in kategorija){
                dogodek.kategorija.push(new kategorijaModel.Kategorija({
                    naziv: kategorija[kat].naziv
                }));
            }

            return dogodek.save().then(() => {
                DatabaseHelper.disconnect();
                return {success: true}
            }).catch((err) => {
                DatabaseHelper.disconnect();
                return {success: false, status: err.errmsg}
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
                return {success: false, status: 'User not yet registered'}
            }
        }).catch((err) => {
                DatabaseHelper.disconnect();
            return {success: false, status: 'Wrong data'}
        });

    }

    static updateUser(id, email, geslo, ime, priimek, tip, medij, kategorija){
        if(!ValidateHelper.validateEmail(email)){
            return {success:false, status: 'Email not valid'};
        }
        DatabaseHelper.connect();

        return userModel.Uporabnik
            .findOne({_id: id, email: email, geslo: geslo})
            .then((user) => {

                user.ime = ime;
                user.priimek = priimek;
                user.geslo = geslo;
                user.email = email;
                user.tip = tip;
                user.medij = medij;
                user.kategorija = kategorija;

                return user.save().then(() => {
                    DatabaseHelper.disconnect();
                    return {success: true}
                }).catch((err) => {
                    DatabaseHelper.disconnect();
                    return {success: false, status: err.errmsg}
                });

            }).catch((err) => {
                DatabaseHelper.disconnect();
                return {success: false, status: err.errmsg}
            });
    }

    static deleteUser(userId){
        DatabaseHelper.connect();
        return userModel.Uporabnik.remove({_id: userId}).then(() => {
            DatabaseHelper.disconnect();
            return {success: true}
        }).catch((err) => {
            DatabaseHelper.disconnect();
            return {success: false, status: err.errmsg}
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
