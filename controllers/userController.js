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
            return {success: true}
        }).catch((err) => {
            return {success: false, status: err}
        }).finally(() => {
            DatabaseHelper.disconnect();
        });
    }

    /* VNOS KATEGORIJE */
    static createKategorija(id, seznamKategorij){
        DatabaseHelper.connect();

        return userModel.Uporabnik.findOne({_id: id}).then((dogodek) => {
            for(let kategorija in seznamKategorij){
                dogodek.kategorija.push(new kategorijaModel.Kategorija({
                    naziv: json[kategorija].naziv
                }));
            }

            return dogodek.save().then(() => {
                return {success: true}
            }).catch((err) => {
                return {success: false, status: err}
            }).finally(() => {
                DatabaseHelper.disconnect();
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
            if(user){
                return user;
            }else{
                return {success: false, status: 'Wrong data'}
            }
        }).catch(() => {
            return {success: false, status: 'Wrong data'}
        }).finally(() => {
                DatabaseHelper.disconnect();
        });

    }

    static updateUser(_id, email, geslo, ime, priimek, tip, medij, seznamKategorij){
        if(!ValidateHelper.validateEmail(json.email)){
            return {success:false, status: 'Email not valid'};
        }
        DatabaseHelper.connect();

        return userModel.Uporabnik
            .findOne({_id: _id, email: email, geslo: geslo})
            .then((user) => {
                user.ime = ime;
                user.priimek = priimek;
                user.geslo = geslo;
                user.email = email;
                user.tip = tip;
                user.medij = medij;
                user.kategorija = seznamKategorij;

                return user.save().then(() => {
                    return {success: true}
                }).catch((err) => {
                    return {success: false, status: "1. "+err}
                });

            }).catch((err) => {
                return {success: false, status: "2. "+err}
            }).finally(() => {
                DatabaseHelper.disconnect();
            });
    }

    static deleteUser(userId){
        DatabaseHelper.connect();
        return userModel.Uporabnik.remove({_id: userId}).then(() => {
            return {success: true}
        }).catch((err) => {
            return {success: false, status: "1. "+err}
        }).finally(() => {
            DatabaseHelper.disconnect();
        });
    }

    static getAllUsers() {
        DatabaseHelper.connect();
        return userModel.Uporabnik.find(function (err, user) {
            return user;
        }).catch(() => {
            return {success: false, status: 'No Data'}
        }).finally(() => {
            DatabaseHelper.disconnect();
        });
    }

    static findUserById(userId) {
        DatabaseHelper.connect();
        return userModel.Uporabnik.findOne({_id: userId})
        .then((user) => {
            return user;
        }).catch(() => {
            return {success: false, status: 'No Data'}
        }).finally(() => {
            DatabaseHelper.disconnect();
        });

    }

}

module.exports = UserController;
