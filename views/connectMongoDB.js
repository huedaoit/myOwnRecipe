var mongoose = require("mongoose")
mongoose.connect(`mongodb://${process.env.MONGO_HOST}:27017/recipeDB`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var conn = mongoose.connection;
conn.on('open', () => {
    console.log('Mongoose connection open');
})
conn .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
});

require('../models/Registration');
require('../models/Recipe');
const app = require('./../app');
// const server = app.listen(3000, () => {
//     console.log(`Express is running on port ${server.address().port}`);
// });