const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    const LikeSchema = new Schema({
            id_uporabnik: Schema.Types.ObjectId,
            like: Boolean
        });


    const Like = mongoose.model('Like', LikeSchema);


module.exports = {LikeSchema, Like};