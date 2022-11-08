
const axios = require("axios");
const Recipe = require('../models/Recipe');
const {check, validationResult} = require("express-validator");
const Console = require("console");
// const axios = require("express/lib/request");
const PUBLISHER_KEY = process.env.PUBLISHER_KEY
const SECRET_KEY = process.env.SECRET_KEY
const stripe =require('stripe')(SECRET_KEY)
//
const joinedHome = function (req, res, next) {
    console.log(req.oidc.isAuthenticated());
    let test = req.oidc.isAuthenticated();
    res.render('home',
        {
            title: '',
            isAuthenticated: test,
            user: req.oidc.user,
        });
};

// /* GET main page. */
const joinedMain = async function (req, res, next) {
    let test = req.oidc.isAuthenticated();

    res.render('index',
        {
            title: '',
            isAuthenticated: test,
            user: req.oidc.user,
            key: PUBLISHER_KEY
        });
};

//Get data
const getData = function (req, res, next) {
    let recipes = Recipe.find({}, function (err, recipes) {
        if (err) {
            console.log(err);
        } else {
            res.json(recipes);
        }
    });

};
//create recipes
const createRecipe = (req, res) => {
    let test = req.oidc.isAuthenticated();
    res.render('Recipe', {
        title: '',
        user: req.oidc.user,
        isAuthenticated: test
    });
}
const submitForm =  (req, res) =>{
    const recipe = new Recipe(req.body);
    recipe.save().then(() =>  res.redirect('/index'));

};

// delete recipe function
const deleteRecipe = function (req, res, next) {

    let deleteRecipe = Recipe.deleteOne({_id: req.params.id}, function (err, deleteRecipe) {
        if (err) {
            console.log(err);
        } else {
            res.json(deleteRecipe);
        }

    })
}
// edit recipe
const editRecipe = function (req, res, next) {
    const  editRecipe = Recipe.findById({_id: req.params.id}, function (err, editRecipe){
        console.log(editRecipe);
       res.render('edit',{
           title: '',
           recipe: editRecipe,

           isAuthenticated: req.oidc.isAuthenticated(),
           user: req.oidc.user
       })
       if(err){
           console.log(err);
       }
   });
};

const updateForm =  (req, res) => {
    Recipe.updateOne({_id:req.params.id}, {
        recipe:req.body.recipe,
        description:req.body.description,
        time:req.body.time,
        ingredient:req.body.ingredient
    }).then(
        () =>{
           res.redirect('/index');

        }
    ).catch(
        (error) =>{
            res.status(400).json({
                error:error
            });
        }
    );

};

const contactUs = (req, res) => {
    let isAuthencated = req.oidc.isAuthenticated();
    res.render('aboutme', {title: 'About Me',
        isAuthenticated: isAuthencated,
        user: req.oidc.user
    });
};

const registrationForm =(req, res) => {
    res.render('Registration', {title: ''});
};

const checkRegister =
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
};

const role_based_authentication = async(req, res) => {
    let data = {
    }
    const { token_type, access_token } = req.oidc.accessToken;

    try{
        // calling the server to get the data, make sure you get the data before moving forward(async, await)
        const apiResponse = await axios.get('http://localhost:3000/role', {
            headers: {
                authorization: `${token_type} ${access_token}`
            }
        });
        data= apiResponse.data;
        // when there is not error, you will be redirected to the secured page with the data you get fromt the api
        res.render('Recipe', {
            title: 'Admin User',
            isAuthenticated: req.oidc.isAuthenticated(),
            user: req.oidc.user,
            data: data
        })
    }catch(e) {
        console.log(e);
        res.render('notAccess', {
            title: 'Not Access Page',
            isAuthenticated: req.oidc.isAuthenticated()
        });
    }

};



const recipe_payment = (req, res) => {
    const  payment = Recipe.findById({_id: req.params.id}, function (err, payment){

        res.render('order',{
            title: '',
            isAuthenticated: req.oidc.isAuthenticated(),
            user: req.oidc.user
        })
        if(err){
            console.log(err);
        }
    });
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: "Lily Dao",
        address: {
            line1: '801 Fennel Road',
            postal_code: '110092',
            city: 'Kelowna',
            state: 'BC',
            country: 'Canada',
        }
    })
        .then((customer) => {
            return stripe.charges.create({
                amount: 7000,
                description: "Product Development",
                currency: "USD",
                customer: customer.id
            })
        })
        .then((charge) => {
            res.render('payment_success', { title: "Payment Success" });
        })
        .catch((err) => {
            res.send(err)    // If some error occurs
        })
}

module.exports = {
    createRecipe,
    deleteRecipe,
    joinedHome,
    joinedMain,
    getData,
    submitForm,
    contactUs,
    registrationForm,checkRegister,
    role_based_authentication,
    editRecipe,
    updateForm,
    recipe_payment



}
