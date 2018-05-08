const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    const KategorijaSchema = new Schema({
            naziv: String
        });

    const Kategorija = mongoose.model('Kategorija', KategorijaSchema);


module.exports = {Kategorija, KategorijaSchema};