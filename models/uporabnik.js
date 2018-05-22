const uuid = require('node-uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Will add the UUID type to the Mongoose Schema types
require('mongoose-uuid2')(mongoose);
const UUID = mongoose.Types.UUID;

const kategorija = require('./kategorija.js');

const UporabnikSchema = new Schema({
        uuid: {type: UUID, default: uuid.v4},
        ime: String,
        priimek: String,
        geslo: { type: String, select: false },
        email: {type: String, required: true, index: {unique: true}},
        tip: String,
        medij: String,
        kategorija: [kategorija.KategorijaSchema]
    });


const Uporabnik = mongoose.model('Uporabnik', UporabnikSchema);

module.exports = {Uporabnik, UporabnikSchema};