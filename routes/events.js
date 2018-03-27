const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

/* CREATE */
router.post('/', function(req, res, next) {
    const { name } = req.body;
    if (!name) {
        res.status(400).send({status: 'Data not received'});
    } else {
        eventController.createEvent(name,
            (createEventResponse) => {
                if(!createEventResponse.success){
                    res.status(406).send(createEventResponse);
                } else {
                    res.status(201).send({success: true});
                }
            });
    }
});

/* READ */
router.get("/", function(req, res, next) {
    eventController.getAllEvents(
        (getAllEventsResponse) => {
            res.status(200).send(getAllEventsResponse);
        });
});
router.get('/:id', function(req, res, next) {
    let eventId = parseInt(req.params.id);
    if(isNaN(eventId)){
        res.status(500).send("ID ni stevilo");
    } else {
        eventController.findEventById(eventId,
            (findEventByIdResponse) => {
                res.status(200).send(findEventByIdResponse);
            });
    }
});

/* UPDATE */
router.put('/', function(req, res, next) {
    const { eventId, name } = req.body;
    if (!eventId || !name) {
        res.status(400).send({status: 'Data not received'});
    } else {
        eventController.updateEvent(eventId, name,
            (updateEventResponse) => {
                if(!updateEventResponse.success){
                    res.status(406).send(updateEventResponse);
                } else {
                    res.status(202).send({success: true});
                }
            });
    }
});

/* DELETE */
router.delete('/', function(req, res, next) {
    let eventId = req.body.eventId;
    if (!eventId) {
        res.status(400).send({status: 'Data not received'});
    } else if(isNaN(parseInt(eventId))){
        res.status(500).send("ID ni stevilo");
    } else {
        eventController.deleteEvent(eventId,
            (deleteEventResponse) => {
                if(!deleteEventResponse.success){
                    res.status(404).send(deleteEventResponse);
                } else {
                    res.status(202).send({success: true});
                }
            });
    }
});

module.exports = router;
