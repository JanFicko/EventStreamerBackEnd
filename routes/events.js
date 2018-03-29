const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

/* CREATE */
router.route('/').post(async (req, res, next) => {
    const { name, userId } = req.body;
    if (!name || !userId) {
        res.status(400).send({success:false, status: "Data not received"});
    } else if(isNaN(parseInt(userId))){
        res.status(500).send({success:false, status: "ID is not a number"});
    } else {
        const createEventResponse = await eventController.createEvent(name, userId);
        if(!createEventResponse.success){
            res.status(406);
        } else {
            res.status(201);
        }
        res.send(createEventResponse);
    }
});

/* READ */
router.route("/").get(async (req, res, next) => {
    res.status(200).send(await eventController.getAllEvents());
});
router.route('/:query').get(async (req, res, next) => {
    const query = parseInt(req.params.query);
    if(isNaN(query)){
        res.status(200).send(await eventController.findEventsByQuery(query));
    } else {
        const events = await eventController.findEventById(query);
        if(!events){
            res.status(204).send();
        } else {
            res.status(200).send(events);
        }
    }
});

/* UPDATE */
router.route('/').put(async (req, res, next) => {
    const { eventId, name } = req.body;
    if (!eventId || !name) {
        res.status(400).send({success:false, status: "Data not received"});
    } else if(isNaN(parseInt(eventId))){
        res.status(500).send({success:false, status: "ID is not a number"});
    } else {
        const updateEventResponse = await eventController.updateEvent(eventId, name);
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
    let eventId = req.body.eventId;
    if (!eventId) {
        res.status(400).send({success:false, status: "Data not received"});
    } else if(isNaN(parseInt(eventId))){
        res.status(500).send({success:false, status: "ID is not a number"});
    } else {
        const deleteEventResponse = await eventController.deleteEvent(eventId);
        if(!deleteEventResponse.success){
            res.status(404)
        } else {
            res.status(202);
        }
        res.send(deleteEventResponse);
    }
});

module.exports = router;
