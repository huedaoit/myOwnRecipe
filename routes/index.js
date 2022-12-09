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
const path = require("path");
const fs = require("fs");
const multer= require("multer");
const handleError = (err, res)=>{
    res
        .status(500)
        .contentType("text/plain")
        .end("Oop! something went wrong");
};
const upload = multer({
    dest:"./public/images"
});
// Home page//
router.get('/',recipeControler.joinedHome);

// /* GET main page. */
router.get('/index',  recipeControler.joinedMain);

router.get('/main',  recipeControler.mainrecipe);
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
router.get('/get-data1', recipeControler.getData1);
//delete recipe
router.delete('/deleteRecipe/:id',recipeControler.deleteRecipe);

// Add recipe
router.get('/Recipe',recipeControler.createRecipe);

router.post('/submit-Form/',upload.single('uploaded_file'), recipeControler.submitForm);

//edit recipe

router.get('/edit/:id',recipeControler.editRecipe);

router.post('/update-form/:id', recipeControler.updateForm);

router.get('/main/:id',recipeControler.readRecipe);
router.post('/main/:id', recipeControler.readForm);
router.get('/upgrade',recipeControler.upgrade);
router.post('/upgrade-form', recipeControler.recipe_payment);
router.get('/payment_success');

//aboutme
router.get('/aboutme', recipeControler.contactUs);



// router.post(
//     "/upload",
//     upload.single("file"),(req, res)=>{
//         const tempPath = req.file.path;
//         const targetPath = path.join(__dirname, "..", "./public/images/image.jpeg");
//
//         if(path.extname(req.file.originalname).toLowerCase() ===".jpeg"){
//              fs.rename(tempPath,targetPath,err =>{
//                 if(err) return handleError(err,res);
//
//                 res
//                     .status(200)
//                     .contentType("text/plain")
//                     .end("File uploaded");
//             });
//         }else {
//             fs.unlink(tempPath,err =>{
//                 if(err) return handleError(err, res);
//
//                 res
//                     .status(403)
//                     .contentType("text/plain")
//                     .end("Only .jpg files are allowed");
//             });
//         }
//     }
// );


module.exports = router;