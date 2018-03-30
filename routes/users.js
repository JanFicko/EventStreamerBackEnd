const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

/* CREATE */
router.route('/').post(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send({success:false, status: "Data not received"});
    } else {
        const createUserResponse = await UserController.createUser(email, password);
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
    res.status(200).send(await UserController.getAllUsers());
});
router.route('/:id').get(async (req, res, next) => {
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        res.status(400 ).send({success:false, status: "ID is not a number"});
    } else {
        const users = await UserController.findUserById(id);
        if(!users){
            res.status(204).send();
        } else {
            res.status(200).send(users);
        }
    }
});

router.route('/login').post(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send({success:false, status: "Data not received"});
    } else {
        const createUserResponse = await UserController.loginUser(email, password);
        if(!createUserResponse){
            res.status(204).send();
        } else {
            res.status(200).send(createUserResponse);
        }
    }
});

/* UPDATE */
router.route('/').put(async (req, res, next) => {
    const { userId, email, password } = req.body;
    if (!userId || !email || !password) {
        res.status(400).send({success:false, status: "Data not received"});
    } else if(isNaN(parseInt(userId))){
        res.status(500).send({success:false, status: "ID is not a number"});
    } else {
        const updateUserResponse = await UserController.updateUser(userId, email, password);
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
        res.status(400).send({success:false, status: "Data not received"});
    } else if(isNaN(parseInt(userId))){
        res.status(500).send({success:false, status: "ID is not a number"});
    } else {
        const deleteUserResponse = await UserController.deleteUser(userId);
        if(!deleteUserResponse.success){
            res.status(404)
        } else {
            res.status(202);
        }
        res.send(deleteUserResponse);
    }
});

module.exports = router;
