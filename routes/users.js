const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* CREATE */
router.route('/').post(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send({status: 'Data not received'});
    } else {
        const createUserResponse = await userController.createUser(email, password);
        if(!createUserResponse.success){
            res.status(406)
        } else {
            res.status(201)
        }
        res.send(createUserResponse)
    }
});

/* READ */
router.route("/").get(async (req, res, next) => {
    res.status(200).send(await userController.getAllUsers());
});
router.route('/:query').get(async (req, res, next) => {
    const query = parseInt(req.params.query);
    if(isNaN(query)){
        res.status(200).send(await userController.findUsersByQuery(query));
    } else {
        res.status(200).send(await userController.findUserById(query));
    }
});

/* UPDATE */
router.route('/').put(async (req, res, next) => {
    const { userId, email, password } = req.body;
    if (!userId || !email || !password) {
        res.status(400).send({status: 'Data not received'});
    } else {
        const updateUserResponse = await userController.updateUser(userId, email, password);
        if(!updateUserResponse.success){
            res.status(406);
        } else {
            res.status(202);
        }
        res.send(updateUserResponse)
    }
});

/* DELETE */
router.route('/').delete(async (req, res, next) => {
    let userId = req.body.userId;
    if (!userId) {
        res.status(400).send({status: 'Data not received'});
    } else if(isNaN(parseInt(userId))){
        res.status(500).send("ID ni stevilo");
    } else {
        const deleteUserResponse = await userController.deleteUser(userId);
        if(!deleteUserResponse.success){
            res.status(404)
        } else {
            res.status(202);
        }
        res.send(deleteUserResponse);
    }
});

module.exports = router;
