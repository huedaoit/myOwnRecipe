require('dotenv').config();

const express = require('express');
const  path = require('path');
const  routes = require('./routes/index');

///auth0
const { auth } = require('express-openid-connect');

const  app = express();
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/public', express.static(__dirname + "/public"))
app.use(express.static('public'));
app.use(express.json());
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.APP_SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUERBASEURL
};
console.log(process.env.APP_SECRET)
app.use(auth(config));

app.use('/',routes);
module.exports = app;

// auth router attaches /login, /logout, and /callback routes to the baseURL
