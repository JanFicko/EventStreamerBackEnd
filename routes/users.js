const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
let database = require('../database/database');
let User = require('../models/user');

/* CREATE */
/*router.post('/', function(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send({status: 'Data not received'});
    } else {
        userController.createUser(email, password,
            (createUserResponse) => {
                if(!createUserResponse.success){
                    res.status(406).send(createUserResponse);
                } else {
                    res.status(201).send({success: true});
                }
            });
    }
});*/

router.route('/').post(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send({status: 'Data not received'});
    } else {
        userController.createUser(email, password,
            (createUserResponse) => {
                if(!createUserResponse.success){
                    res.status(406).send(createUserResponse);
                } else {
                    res.status(201).send({success: true});
                }
            });
    }



    /*const { email, password } = req.body;
    try {
        let newUser = new User(undefined, email, password, Date.now(), undefined);
        const testuser = await new database.User(newUser).save(null, { method: 'insert' });
        res.json(testuser.toJSON());
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }*/
});

/* READ */
router.get("/", function(req, res, next) {
    userController.getAllUsers(
        (getAllUsersResponse) => {
            res.status(200).send(getAllUsersResponse);
        });
});
router.get('/:query', function(req, res, next) {
    const query = parseInt(req.params.query);
    if(isNaN(query)){
        userController.findUsersByQuery(query,
            (findUserByQueryResponse) => {
                res.status(200).send(findUserByQueryResponse);
            });
    } else {
        userController.findUserById(userId,
            (findUserByIdResponse) => {
                res.status(200).send(findUserByIdResponse);
            });
    }
});

/* UPDATE */
router.put('/', function(req, res, next) {
    const { userId, email, password } = req.body;
    if (!userId || !email || !password) {
        res.status(400).send({status: 'Data not received'});
    } else {
        userController.updateUser(userId, email, password,
            (updateUserResponse) => {
                if(!updateUserResponse.success){
                    res.status(406).send(updateUserResponse);
                } else {
                    res.status(202).send({success: true});
                }
            });
    }
});

/* DELETE */
router.delete('/', function(req, res, next) {
    let userId = req.body.userId;
    if (!userId) {
        res.status(400).send({status: 'Data not received'});
    } else if(isNaN(parseInt(userId))){
        res.status(500).send("ID ni stevilo");
    } else {
        userController.deleteUser(userId,
            (deleteUserResponse) => {
                if(!deleteUserResponse.success){
                    res.status(404).send(deleteUserResponse);
                } else {
                    res.status(202).send({success: true});
                }
            });
    }
});

module.exports = router;
