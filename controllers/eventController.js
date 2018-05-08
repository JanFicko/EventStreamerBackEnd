const dogodekModel = require('../models/dogodek');
const kategorijaModel = require('../models/kategorija');
const lokacijaModel = require('../models/lokacija');
const hashtagModel = require('../models/hashtag');
const UserController = require('../controllers/userController');
const DatabaseHelper = require('../helpers/databaseHelper');

class EventController  {

    /* CREATE */
    // event
    static async createEvent(json, id_uporabnik) {
        const user = await UserController.findUserById(id_uporabnik);
        if (!user) {
            return {success: false, status: "User does not exist"};
        }
        DatabaseHelper.connect();

        let dogodek = new dogodekModel.Dogodek({
            naziv: json.naziv,
            opis: json.opis,
            izvajalec: json.izvajalec,
            datum: json.datum,
            zacetek: json.zacetek,
            id_uporabnik: json.id_uporabnik
        });

        return DatabaseHelper.saveToDatabase(dogodek);
    }

    // kategorija
    static async createKategorija(json, id_dogodek) {
        const dogodek = await this.findEventById(id_dogodek);
        if (!dogodek) {
            return {success: false, status: "Event does not exist"};
        }
        DatabaseHelper.connect();

        return dogodekModel.Dogodek.findOne({_id: id_dogodek}).then((dogodek) => {
            for(let kat in json.kategorija){
                dogodek.kategorija.push(new kategorijaModel.Kategorija({
                    naziv: json.kategorija[kat].naziv
                }));
            }

            return DatabaseHelper.saveToDatabase(dogodek);
        });
    }

    // lokacija
    static async createLokacija(json, id_dogodek) {
        const dogodek = await this.findEventById(id_dogodek);
        if (!dogodek) {
            return {success: false, status: "Event does not exist"};
        }
        DatabaseHelper.connect();

        return dogodekModel.Dogodek.findOne({_id: id_dogodek}).then((dogodek) => {
            for(let kat in json.lokacija){
                dogodek.lokacija.push(new lokacijaModel.Lokacija({
                    longitude: json.lokacija[kat].longitude,
                    latitude: json.lokacija[kat].latitude
                }));
            }

            return DatabaseHelper.saveToDatabase(dogodek);
        });
    }

    // hashtag
    static async createHashtag(json, id_dogodek) {
        const dogodek = await this.findEventById(id_dogodek);
        if (!dogodek) {
            return {success: false, status: "Event does not exist"};
        }
        DatabaseHelper.connect();

        return dogodekModel.Dogodek.findOne({_id: id_dogodek}).then((dogodek) => {
            for(let kat in json.hashtag){
                dogodek.hashtag.push(new hashtagModel.Hashtag({
                    hashtag: json.hashtag[kat].hashtag
                }));
            }

            return DatabaseHelper.saveToDatabase(dogodek);
        });
    }

    /* UPDATE */
    // event
    static async updateEvent(id_dogodek, json){
        const dogodek = await this.findEventById(id_dogodek);
        if (!dogodek) {
            return {success: false, status: "User does not exist"};
        }
        DatabaseHelper.connect();

        return dogodekModel.Dogodek.findOne({_id: id_dogodek}).then((dogodek) => {
            dogodek.naziv = json.naziv;
            dogodek.opis = json.opis;
            dogodek.izvajalec = json.izvajalec;
            dogodek.datum = json.datum;
            dogodek.zacetek = json.zacetek;

            return DatabaseHelper.saveToDatabase(dogodek);
        });
    }

    // kategorija - s tem tudi izbrises
    static async updateKategorija(id_dogodek, json){
        const dogodek = await this.findEventById(id_dogodek);
        if (!dogodek) {
            return {success: false, status: "User does not exist"};
        }
        DatabaseHelper.connect();

        return dogodekModel.Dogodek.findOne({_id: id_dogodek}).then((dogodek) => {
            dogodek.kategorija = json.kategorija;

            return DatabaseHelper.saveToDatabase(dogodek);
        });
    }

    // lokacija - s tem tudi izbrises
    static async updateLokacija(id_dogodek, json){
        const dogodek = await this.findEventById(id_dogodek);
        if (!dogodek) {
            return {success: false, status: "User does not exist"};
        }
        DatabaseHelper.connect();

        return dogodekModel.Dogodek.findOne({_id: id_dogodek}).then((dogodek) => {
            dogodek.lokacija = json.lokacija;

            return DatabaseHelper.saveToDatabase(dogodek);
        });
    }

    // hashtag - s tem tudi izbrises
    static async updateHashtag(id_dogodek, json){
        const dogodek = await this.findEventById(id_dogodek);
        if (!dogodek) {
            return {success: false, status: "User does not exist"};
        }
        DatabaseHelper.connect();

        return dogodekModel.Dogodek.findOne({_id: id_dogodek}).then((dogodek) => {
            dogodek.hashtag = json.hashtag;

            return DatabaseHelper.saveToDatabase(dogodek);
        });
    }

    /* DELETE */
    // event
    static deleteEvent(eventId){
        DatabaseHelper.connect();
        return dogodekModel.Dogodek.remove({_id: eventId}).then(() => {
            DatabaseHelper.disconnect();
            return {success: true}
        }).catch((err) => {
            DatabaseHelper.disconnect();
            return {success: false, status: "1. "+err}
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
            return {success: false, status: 'No Data'}
        });
    }

    // event by id
    static findEventById(eventId) {
        DatabaseHelper.connect();

        return dogodekModel.Dogodek.findOne({_id: eventId})
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
        console.log(query);
        return dogodekModel.Dogodek.findOne({naziv: query})
            .then((event) => {
                DatabaseHelper.disconnect();
                return event;
            }).catch(() => {
                DatabaseHelper.disconnect();
                return null;
            });
    }

}

module.exports = EventController;
