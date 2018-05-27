const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const like = require('./like.js');


const ObjavaSchema = new Schema({
        id_uporabnik: Schema.Types.ObjectId,
        komentar: String,
        slika: String,
        datum: String,
        like: [like.LikeSchema]
    });

const Objava = mongoose.model('Objava', ObjavaSchema);


module.exports = {ObjavaSchema, Objava};