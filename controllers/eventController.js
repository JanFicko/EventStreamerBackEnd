let Event = require('../models/event');

class EventController  {

    static createEvent(name, callback){

        // TODO: Insert into DB
        //let event = new Event(undefined, name);
        callback({success:true});
    }

    static updateEvent(eventId, name, callback){

        // TODO: Update into DB
        //let event = new Event(eventId, name);
        callback({success:true});
    }
    static deleteEvent(eventId, callback){
        // TODO: Delete event
        callback({success:true});
    }

    static getAllEvents(callback) {
        // TODO: Get all events from DB
        callback([
            {eventId: 1, name: "Formula 1 testiranje"},
            {eventId: 2, name: "Nogometna tekma"},
            {eventId: 3, name: "Izredni dogodek"}
        ]);
    }

    static findEventById(eventId, callback) {
        // TODO: Find user from DB by ID
        callback(
            {eventId: eventId, name: "Formula 1 testiranje"}
        );
    }

}

module.exports = EventController;
