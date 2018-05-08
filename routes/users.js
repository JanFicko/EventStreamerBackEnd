const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

/* CREATE */
// Uporabnik
router.route('/').post(async (req, res, next) => {
    const json = req.body;

    if (!json) {
        res.status(400).send({success:false, status: "Data not received"});
    } else {
        const createUserResponse = await UserController.createUser(json);
        if(!createUserResponse.success){
            res.status(406)
        } else {
            res.status(201)
        }
        res.send(createUserResponse)
    }
});

// Kategorija
router.route('/kategorija').post(async (req, res, next) => {
   const json = req.body;
   const id = (req.body.id_uporabnik).toString();

   if(!json){
       res.status(400)
   } else {
       const createUserResponse = await UserController.createKategorija(id, json);
       if(!createUserResponse.success){
           res.status(406)
       }else{
           res.status(201)
       }
       res.send(createUserResponse)
   }
});

/* READ */
// uporabniki
router.route("/").get(async (req, res, next) => {
    res.status(200).send(await UserController.getAllUsers());
});
//uporabnik - id
router.route('/:id').get(async (req, res, next) => {
    const id = (req.params.id).toString();
    if(!id){
        res.status(400).send({success:false, status: "No ID number"});
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
    const json = req.body;

    if (!json.email || !json.geslo) {
        res.status(400).send({success:false, status: "Data not received"});
    } else {
        const createUserResponse = await UserController.loginUser(json.email, json.geslo);
        if(!createUserResponse){
            res.status(204).send();
        } else {
            res.status(200).send(createUserResponse);
        }
    }
});

/* UPDATE */
router.route('/').put(async (req, res, next) => {
    const json = req.body;
    if (!json._id || !json.email || !json.geslo) {
        res.status(400).send({success:false, status: "Data not received"});
    } else if(!(json._id).toString()){
        res.status(500).send({success:false, status: "ID is not a number"});
    } else {
        const updateUserResponse = await UserController.updateUser(json);
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
    let userId = req.body._id;
    if (!userId) {
        res.status(400).send({success:false, status: "Data not received"});
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
