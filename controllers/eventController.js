const dogodekModel = require('../models/dogodek');
const kategorijaModel = require('../models/kategorija');
const lokacijaModel = require('../models/lokacija');
const hashtagModel = require('../models/hashtag');
const UserController = require('../controllers/userController');
const DatabaseHelper = require('../helpers/databaseHelper');

class EventController  {

    /* CREATE */
    // event
    static async createEvent(naziv, opis, datum, id_uporabnik, lokacija, kategorija) {
        const user = await UserController.findUserById(id_uporabnik);
        if (!user) {
            return {success: false, status: "User does not exist"};
        }

        DatabaseHelper.connect();

        let dogodek = new dogodekModel.Dogodek({
            naziv: naziv,
            opis: opis,
            datum: datum,
            id_uporabnik: id_uporabnik,
            lokacija: lokacija,
            kategorija: kategorija
        });

        return dogodek.save().then(() => {
            DatabaseHelper.disconnect();
            return {success: true}
        }).catch((err) => {
            DatabaseHelper.disconnect();
            console.log(err);
            return {success: false, status: err.errmsg}
        });

    }

    // kategorija
    static createKategorija(kategorija, id_dogodek) {
        DatabaseHelper.connect();

        return dogodekModel.Dogodek
            .findOne({_id: id_dogodek})
            .then((dogodek) => {
                dogodek.kategorija = kategorija;

                return dogodek.save().then(() => {
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

    // lokacija
    static async createLokacija(lokacija, id_dogodek) {
        DatabaseHelper.connect();

        return dogodekModel.Dogodek
            .findOne({_id: id_dogodek})
            .then((dogodek) => {
                dogodek.lokacija = lokacija;

                return dogodek.save().then(() => {
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

    // hashtag
    static async createHashtag(hashtag, id_dogodek) {
        DatabaseHelper.connect();

        return dogodekModel.Dogodek.findOne({_id: id_dogodek})
            .then((dogodek) => {
                dogodek.hashtag = hashtag;

                return dogodek.save().then(() => {
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

    /* UPDATE */
    // event
    static updateEvent(id_dogodek, naziv, opis, datum){
        DatabaseHelper.connect();

        return dogodekModel.Dogodek
            .findOne({_id: id_dogodek})
            .then((dogodek) => {

                dogodek.naziv = naziv;
                dogodek.opis = opis;
                dogodek.datum = datum;

                return dogodek.save().then(() => {
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

    /* DELETE */
    // event
    static deleteEvent(eventId){
        DatabaseHelper.connect();
        return dogodekModel.Dogodek
            .remove({_id: eventId})
            .then(() => {
                DatabaseHelper.disconnect();
                return {success: true}
        }).catch((err) => {
            DatabaseHelper.disconnect();
            return {success: false, status: err.errmsg}
        });
    }

    /* GET */
    // all events
    static getAllEvents() {
        DatabaseHelper.connect();

        return dogodekModel.Dogodek.find(function (err, dogodek) {
            DatabaseHelper.disconnect();
            return dogodek;
        }).catch(() => {
            DatabaseHelper.disconnect();
            return {success: false, status: 'No Data'};
        });
    }

    // event by id
    static findEventById(eventId) {
        DatabaseHelper.connect();

        return dogodekModel.Dogodek
            .findOne({_id: eventId})
            .then((event) => {
                DatabaseHelper.disconnect();
                return event;
            }).catch(() => {
                DatabaseHelper.disconnect();
                return null;
            });
    }

    // by query
    static findEventsByQuery(query) {
        DatabaseHelper.connect();

        return dogodekModel.Dogodek
            .find({naziv: { "$regex": query, "$options": "i" }}, function (err, docs) {
                console.log(docs);
            })
            .then((event) => {
                if(Object.keys(event).length === 0){
                    event = dogodekModel.Dogodek
                        .find({opis: { "$regex": query, "$options": "i" }})
                        .then((event) => {
                            DatabaseHelper.disconnect();
                            return event;
                        }).catch((error) => {
                            console.log(error);
                            DatabaseHelper.disconnect();
                            return {success: false, status: 'No Data'};
                        });
                }

                console.log(event);
                return event;
            }).catch((error) => {
                console.log(error);
                DatabaseHelper.disconnect();
                return {success: false, status: 'No Data'};
            });
    }

}

module.exports = EventController;
