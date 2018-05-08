const express = require('express');
const router = express.Router();
const EventController = require('../controllers/eventController');

/* CREATE */
// dogodek
router.route('/').post(async (req, res, next) => {
    console.log(req.body);
    const json = req.body;
    if (!json || !json.id_uporabnik) {
        res.status(400).send({success:false, status: "Data not received"});
    } else {
        const createEventResponse = await EventController.createEvent(json, json.id_uporabnik);
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
    const json = req.body;

    if (!json.kategorija || !json.id_dogodek) {
        res.status(400).send({success:false, status: "Data not received"});
    } else {
        const createEventResponse = await EventController.createKategorija(json, json.id_dogodek);
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
    console.log(req.body);
    const json = req.body;
    if (!json.lokacija || !json.id_dogodek) {
        res.status(400).send({success:false, status: "Data not received"});
    } else {
        const createEventResponse = await EventController.createLokacija(json, json.id_dogodek);
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
    console.log(req.body);
    const json = req.body;
    if (!json.hashtag || !json.id_dogodek) {
        res.status(400).send({success:false, status: "Data not received"});
    } else {
        const createEventResponse = await EventController.createHashtag(json, json.id_dogodek);
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
    const json = req.body;
    if (!json._id) {
        res.status(400).send({success:false, status: "Data not received"});
    } else {
        const updateEventResponse = await EventController.updateEvent(json._id, json);
        if(!updateEventResponse.success){
            res.status(406);
        } else {
            res.status(202);
        }
        res.send(updateEventResponse)
    }
});

// kategorija
router.route('/kategorija').put(async (req, res, next) => {
    const json = req.body;
    if (!json.id_dogodek) {
        res.status(400).send({success:false, status: "Data not received"});
    } else {
        const updateEventResponse = await EventController.updateKategorija(json.id_dogodek, json);
        if(!updateEventResponse.success){
            res.status(406);
        } else {
            res.status(202);
        }
        res.send(updateEventResponse)
    }
});

// lokacija
router.route('/lokacija').put(async (req, res, next) => {
    const json = req.body;
    if (!json.id_dogodek) {
        res.status(400).send({success:false, status: "Data not received"});
    } else {
        const updateEventResponse = await EventController.updateLokacija(json.id_dogodek, json);
        if(!updateEventResponse.success){
            res.status(406);
        } else {
            res.status(202);
        }
        res.send(updateEventResponse)
    }
});

// hashtag
router.route('/hashtag').put(async (req, res, next) => {
    const json = req.body;
    if (!json.id_dogodek) {
        res.status(400).send({success:false, status: "Data not received"});
    } else {
        const updateEventResponse = await EventController.updateHashtag(json.id_dogodek, json);
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
