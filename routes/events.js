const express = require('express');
const router = express.Router();
const EventController = require('../controllers/eventController');

/* CREATE */
// dogodek
router.route('/').post(async (req, res, next) => {
    const {naziv, opis, datum, id_uporabnik, lokacija, kategorija} = req.body;

    if (!naziv || !opis || !datum || !id_uporabnik) {
        res.status(400).send({success:false, status: "Data not received"});
    } else {
        const createEventResponse = await EventController.createEvent(naziv, opis, datum, id_uporabnik, lokacija, kategorija);
        if(!createEventResponse.success){
            res.status(406);
        } else {
            res.status(201);
        }
        res.send(createEventResponse);
    }
});

// kategorija
router.route('/kategorija').post(async (req, res, next) => {
    const {kategorija, id_dogodek} = req.body;

    if (!kategorija || !id_dogodek) {
        res.status(400).send({success:false, status: "Data not received"});
    } else {
        const createEventResponse = await EventController.createKategorija(kategorija, id_dogodek);
        if(!createEventResponse.success){
            res.status(406);
        } else {
            res.status(201);
        }
        res.send(createEventResponse);
    }
});

// lokacija
router.route('/lokacija').post(async (req, res, next) => {
    const {lokacija, id_dogodek} = req.body;
    if (!lokacija || !id_dogodek) {
        res.status(400).send({success:false, status: "Data not received"});
    } else {
        const createEventResponse = await EventController.createLokacija(lokacija, id_dogodek);
        if(!createEventResponse.success){
            res.status(406);
        } else {
            res.status(201);
        }
        res.send(createEventResponse);
    }
});

// hashtag
router.route('/hashtag').post(async (req, res, next) => {
    const {hashtag, id_dogodek} = req.body;

    if (!hashtag || !id_dogodek) {
        res.status(400).send({success:false, status: "Data not received"});
    } else {
        const createEventResponse = await EventController.createHashtag(hashtag, id_dogodek);
        if(!createEventResponse.success){
            res.status(406);
        } else {
            res.status(201);
        }
        res.send(createEventResponse);
    }
});

/* READ */
// all events
router.route("/").get(async (req, res, next) => {
    res.status(200).send(await EventController.getAllEvents());
});


// query
router.route('/:query').get(async (req, res, next) => {
    const query = req.params.query;

    console.log(query);
    if(query) {
        let events = await EventController.findEventsByQuery(query);

        if (events) {
            console.log(events);
            res.status(200).send(events);
        } else {
            events = await EventController.findEventById(query);
            if (!events) {
                res.status(204).send();
            } else {
                res.status(200).send(events);
            }
        }
    }
});

/* UPDATE */
// event
router.route('/').put(async (req, res, next) => {
    const {id_dogodek, naziv, opis, izvajalec, datum} = req.body;

    if (!id_dogodek || !naziv || !opis || !izvajalec || !datum) {
        res.status(400).send({success:false, status: "Data not received"});
    } else {
        const updateEventResponse = await EventController.updateEvent(id_dogodek, naziv, opis, izvajalec, datum);
        if(!updateEventResponse.success){
            res.status(406);
        } else {
            res.status(202);
        }
        res.send(updateEventResponse)
    }
});


/* DELETE */
router.route('/').delete(async (req, res, next) => {
    let eventId = req.body._id;
    if (!eventId) {
        res.status(400).send({success:false, status: "Data not received"});
    } else {
        const deleteEventResponse = await EventController.deleteEvent(eventId);
        if(!deleteEventResponse.success){
            res.status(404)
        } else {
            res.status(202);
        }
        res.send(deleteEventResponse);
    }
});

module.exports = router;
