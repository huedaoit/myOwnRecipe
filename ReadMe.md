

# how to run in docker
```bash
docker run --name mongo  -p 27017:27017 mongo 

docker run --name app  -e APP_SECRET='12324DRGTDFBGVJHKNMGHFGHF' \
-p 3000:3000 \
-e BASEURL='http://localhost:3000' \
-e CLIENTID='QGimhGwfMKSpNdAGHWwGUkERwepcm6Im' \
-e CLIENTSECRET='UAxWl3xQj8piHrL1GYvvUsGnsn-GNrtQu2LWO9CtASRYz9AHaRfJRwrrVghUEKsS' \
-e ISSUER='https://dev-n7fr5meyt1w484cf.us.auth0.com' \
-e MONGO_HOST=10.0.0.172  \
-e PUBLISHER_KEY='pk_test_51M1Io2IdXWGbKQYHpzz2bk0kUGQGjKlQXGMANLUFBzCS8dPLKfSYjpXN8Jdolxz3tVHAS0kwAuIfoqaWOJuIK3N00aTK6oo8D'  \
-e  SECRET_KEY='sk_test_51M1Io2IdXWGbKQYHNGD5S2plos7ASAHenxKkcBLUYcgXZxSI2IeCnpJgOQsTaNcVSAIPMmDCt6X48QN53PRW9Rd300SW0LjoZC' \
  app 

```



Installation
   npm v4.18.2
   mongoose v6.5.2
   bootstrap": "^5.2.0",
   express": "^4.18.2",

Download and install Node.js  express
$npm install
$npm install express

Install mongoDB  via command line
$ brew install mongodb-community@ -version
Run application:
 use the command $ npm start to start application
 ctrl+c to stop running application









