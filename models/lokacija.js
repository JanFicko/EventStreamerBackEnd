const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const LokacijaSchema = new Schema({
        longitude: SchemaTypes.Double,
        latitude: SchemaTypes.Double
    });

const Lokacija = mongoose.model('Lokacija', LokacijaSchema);

module.exports = {LokacijaSchema, Lokacija};