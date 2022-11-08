const express = require('express');
const {auth} = require('express-openid-connect');

const mongoose = require('mongoose');
require('../views/connectMongoDB');
const {check, validationResult, checkSchema} = require('express-validator');
const router = express.Router();
const Registration = mongoose.model('Registration');
// const Recipe = mongoose.model('Recipe');
const Recipe = require('../models/Recipe');
const axios = require('axios');
const recipeControler = require("../controler/recipeControler");
const { requiresAuth } = require('express-openid-connect');
const rerecipeControler = require("../controler/recipeControler");
const { claimCheck } = require('express-openid-connect');

// Home page//
router.get('/',recipeControler.joinedHome);

// /* GET main page. */
router.get('/index',  recipeControler.joinedMain);

// Get registration form
router.get('/Registration', recipeControler.registrationForm);

router.post('/registration',
    [
        check('email')
            .isLength({min: 1})
            .withMessage('Please enter a email'),
        check('password')
            .isLength({min: 1})
            .withMessage('Please enter an password'),
    ], recipeControler.checkRegister);
// Get data
router.get('/get-data', recipeControler.getData);

//delete recipe
router.delete('/deleteRecipe/:id',recipeControler.deleteRecipe);

// Add recipe
router.get('/Recipe',recipeControler.createRecipe);

router.post('/submit-Form', recipeControler.submitForm);

//edit recipe

router.get('/edit/:id',recipeControler.editRecipe);

router.post('/update-form/:id', recipeControler.updateForm);

router.post('/Recipe/payment', recipeControler.recipe_payment);

//aboutme
router.get('/aboutme', recipeControler.contactUs);
router.get('/Recipe', requiresAuth(), rerecipeControler.role_based_authentication);
module.exports = router;