let Event = require('../models/event');
let userController = require('../controllers/userController');

class EventController  {

    static async createEvent(name, userId){
        const user = await userController.findUserById(userId);
        if(!user){
            return {success:false, status:"User does not exist"};
        }

        return new Event.eventModel()
            .save(new Event(undefined, name, Date.now(), undefined, userId), {method:"insert"})
            .then(() => {
                return {success:true};
            })
            .catch((error) => {
                return {success:false, status:error};
            });
    }

    static updateEvent(eventId, name){
        return new Event.eventModel()
            .where("eventId", "=", eventId)
            .save(new Event(eventId, name, undefined, Date.now(), undefined), {method:"update", patch: true})
            .then(() => {
                return {success:true};
            })
            .catch((error) => {
                return {success:false, status:error};
            });
    }
    static deleteEvent(eventId){
        return new Event.eventModel()
            .where("eventId", "=", eventId)
            .destroy()
            .then(() => {
                return {success:true};
            })
            .catch((error) => {
                return {success:false, status:error};
            });
    }

    static getAllEvents() {
        return new Event.eventModel()
            .fetchAll()
            .then((events) => {
                return events;
            })
            .catch((error) => {
                return {success:false, status:error};
            });
    }

    static findEventById(eventId) {
        return new Event.eventModel()
            .where("eventId", "=", eventId)
            .fetch()
            .then((event) => {
                return event;
            })
            .catch((error) => {
                return {success:false, status:error};
            });
    }

    static findEventsByQuery(query) {
        return new Event.eventModel()
            .where("name = " + query)
            .fetchAll()
            .then((events) => {
                return events;
            })
            .catch((error) => {
                return {success:false, status:error};
            });
    }

}

module.exports = EventController;
