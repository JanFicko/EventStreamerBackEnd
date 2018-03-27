class Event {
    constructor(eventId, name, timeCreated, timeUpdated) {
        this.eventId = eventId;
        this.name = name;
        this.timeCreated = timeCreated;
        this.timeUpdated = timeUpdated;
    }
}
module.exports = Event;