const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

/* CREATE */
// Vnos uporabnik
router.route('/').post(async (req, res, next) => {
    const {ime, priimek, geslo, email, tip, medij} = req.body;

    if (!ime || !priimek || !geslo || !email || !tip || !medij) {
        res.status(400).send({success:false, status: "Data not received"});
    } else {
        const createUserResponse = await UserController.createUser(ime, priimek, geslo, email, tip, medij);
        if(!createUserResponse.success){
            res.status(406)
        } else {
            res.status(201)
        }
        res.send(createUserResponse)
    }
});

// Vnos kategorije
router.route('/kategorija').post(async (req, res, next) => {
   const {id, kategorija} = req.body;

   if(!id || !kategorija){
       res.status(400)
   } else {
       const createUserResponse = await UserController.createKategorija(id, kategorija);
       if(!createUserResponse.success){
           res.status(406)
       }else{
           res.status(201)
       }
       res.send(createUserResponse)
   }
});

/* READ */
// Pridobi vse uporabnike
router.route("/").get(async (req, res, next) => {
    res.status(200).send(await UserController.getAllUsers());
});
// Pridobi uporabnika z ID-jem
router.route('/:id').get(async (req, res, next) => {
    const id = (req.params.id);
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

// Prijava uporabnika
router.route('/login').post(async (req, res, next) => {
    const {email, geslo} = req.body;

    if (!email || !geslo) {
        res.status(400).send({success:false, status: "Data not received"});
    } else {
        const createUserResponse = await UserController.loginUser(email, geslo);
        if(!createUserResponse){
            res.status(204).send();
        } else {
            res.status(200).send(createUserResponse);
        }
    }
});

/* UPDATE */
router.route('/').put(async (req, res, next) => {
    const {id, email, geslo, ime, priimek, tip, medij, kategorija } = req.body;
    if (!id || !email || !geslo) {
        res.status(400).send({success:false, status: "Data not received"});
    } else if(!(id).toString()){
        res.status(500).send({success:false, status: "ID is not a number"});
    } else {
        const updateUserResponse = await UserController.updateUser(id, email, geslo, ime, priimek, tip, medij, kategorija);
        if(!updateUserResponse.success){
            res.status(406);
        } else {
            res.status(202);
        }
        res.send(updateUserResponse);
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
