const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const objava = require('./objava.js');
const kategorija = require('./kategorija.js');
const lokacija = require('./lokacija.js');
const hashtag = require('./hashtag.js');

const DogodekSchema = new Schema({
        naziv: String,
        opis: String,
        izvajalec: String,
        datum: String,
        objava: [objava.ObjavaSchema],
        kategorija: [kategorija.KategorijaSchema],
        lokacija: [lokacija.LokacijaSchema],
        hashtag: [hashtag.HashtagSchema],
        id_uporabnik: Schema.Types.ObjectId
    });

const Dogodek = mongoose.model('Dogodek', DogodekSchema);

module.exports = {Dogodek, DogodekSchema};