require('dotenv').config();
const express = require('express');
const  path = require('path');
const  routes = require('./routes/index');
const { auth } = require('express-openid-connect');
const recipeControler = require('./controler/recipeControler');
const {expressjwt:jwt} = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
var jwks = require('jwks-rsa');

///auth0
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
    issuerBaseURL: process.env.ISSUER,
    clientSecret: process.env.CLIENTSECRET,
    authorizationParams: {
        response_type: 'code',
        audience: 'http://localhost:3000',
        scope: 'openid profile read:messages'
    }
};
app.use(auth(config));

//  jwt middleware checking
var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-n7fr5meyt1w484cf.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'http://localhost:3000',
    issuer: 'https://dev-n7fr5meyt1w484cf.us.auth0.com/',
    algorithms: ['RS256']
});


const checkPermission = jwtAuthz(["read:messages"], {
    customScopeKey: "permissions"
})
//
app.get('/public', (req, res) => {
    res.json({
        type: "public"
    })
})
app.get('/private', jwtCheck, (req, res) => {
    res.json({
        type: "Private Data"
    })
})
app.get('/role', jwtCheck, checkPermission,(req,res) =>
{
    res.json({
        type: "Role base authentication success"
    });
});

app.use('/',routes);
module.exports = app;

