const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

/* CREATE */
// Vnos uporabnik
router.route('/').post(async (req, res, next) => {
    const {ime, priimek, geslo, email, tip, medij} = req.body;

    if (!ime || !priimek || !geslo || !email || !tip) {
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
   const {_id, kategorija} = req.body;

   if(!_id || !kategorija){
       res.status(400).send({success:false, status: "Data not received"});
   } else {
       const createUserResponse = await UserController.createKategorija(_id, kategorija);
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
router.route('/:idUporabnik').get(async (req, res, next) => {
    const id_uporabnik = req.params.idUporabnik;

    if(!id_uporabnik){
        res.status(400).send({success:false, status: "No ID number"});
    } else {
        const users = await UserController.findUserById(id_uporabnik);
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
    const {_id, email, geslo, ime, priimek, tip, medij, kategorija } = req.body;

    console.log(req.body);
    if (!_id || !email || !geslo) {
        res.status(400).send({success:false, status: "Data not received"});
    } else if(!(_id).toString()){
        res.status(500).send({success:false, status: "ID is not a number"});
    } else {
        const updateUserResponse = await UserController.updateUser(_id, email, geslo, ime, priimek, tip, medij, kategorija);
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
    const {_id} = req.body;

    if (!_id) {
        res.status(400).send({success:false, status: "Data not received"});
    } else {
        const deleteUserResponse = await UserController.deleteUser(_id);
        if(!deleteUserResponse.success){
            res.status(404)
        } else {
            res.status(202);
        }
        res.send(deleteUserResponse);
    }
});

module.exports = router;
