const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

    const HashtagSchema = new Schema ({
            hashtag: String
        });

    const Hashtag = mongoose.model('Hashtag', HashtagSchema);

module.exports = {Hashtag, HashtagSchema};