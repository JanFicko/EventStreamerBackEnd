const url = "mongodb+srv://event_streamer:marecare2018@eventstreamer-seyww.mongodb.net/EventStreamer";
const mongoose = require('mongoose');

class Database{

    static connect(){
        return mongoose.connect(url);
    }

    static disconnect(){
        mongoose.disconnect();
    }

    static saveToDatabase(data){
        return data.save().then(() => {
            this.disconnect();
            return {success: true};
        }).catch((err) => {
            this.disconnect();
            return {success: false, status: "baza => "+err}
        });
    }
}

module.exports = Database;