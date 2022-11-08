const  mongoose = require("mongoose");

// create an schema
const recipeSchema = new mongoose.Schema({

    recipe:{
        type: String,
        trim: true
    },
    description:{
        type:String,
        trim:true
    } ,

    ingredient:{
        type: String,
        trim:true
    },
    time:{
        type: String,
        trim:true
    }
});
module.exports = mongoose.model('Recipe',recipeSchema,'recipe');