const express = require('express');
const {auth} = require('express-openid-connect');
const mongoose = require('mongoose');
require('../views/connectMongoDB');
const {check, validationResult, checkSchema} = require('express-validator');
const router = express.Router();
const Registration = mongoose.model('Registration');
const Recipe = mongoose.model('Recipe');

// /* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.oidc.isAuthenticated());
    let test = req.oidc.isAuthenticated();
    res.render('index',
        {title: '',
         isAuthenticated: test
    });

});
router.get('/get-data', function (req, res, next) {
    let recipe = Recipe.find({}, function (err, recipe) {
        if (err) {
            console.log(err);
        } else {
            res.json(recipe);
        }
    });

});
router.delete('/deleteRecipe/:id',function (req,res,next){
    let deleteRecipe= Recipe.deleteOne({_id:req.params.id},function (err,deleteRecipe){
        if(err){
            console.log(err);
        }else{
            res.json(deleteRecipe);
        }

    })
})


// Get registration form
router.get('/Registration', (req, res) => {
    res.render('Registration', {title: ''});
});
router.post('/registration',
    [
        check('email')
            .isLength({min: 1})
            .withMessage('Please enter a email'),
        check('password')
            .isLength({min: 1})
            .withMessage('Please enter an password'),
    ],
    (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const registration = new Registration(req.body);
            registration.save()
                .then(() => {
                    res.send('Thank you for your registration!');
                })
                .catch((err) => {
                    console.log(err);
                    res.send('Sorry! Something went wrong.');
                });
        }
    });

// Add recipe
router.get('/Recipe', (req, res) => {
    let test = req.oidc.isAuthenticated();
    res.render('Recipe', {title: '',
        isAuthenticated: test
    });
});
router.post('/submit-form',

    (req, res) => {
        const recipe = new Recipe(req.body);
        recipe.save().then(() => res.send('Thank you for adding your recipe'));
    });

//aboutme
router.get('/aboutme', (req, res) => {
    let test = req.oidc.isAuthenticated();
    res.render('aboutme', {title: 'About Me',
        isAuthenticated: test
    });
})


//req.isAuthenticated is provided from the auth router
// router.get('/login', (req, res) => {
//    console.log(req.oidc.isAuthenticated())
//     res.render('login', {title: 'Log In'});
//     let isAuthenticated = req.oidc.isAuthenticated();
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });
module.exports = router;