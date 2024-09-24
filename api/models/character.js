//where you will work
//below is just a skeleton model, change it however you wish.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;//dont change the consts here, just the object below

const characterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    health: {
        type: Number,
        required: true 
        /*
        required: true | will make it so that the user HAS to input a value when creating a new character
        required: false | will make it optional, if you do this, you should set a default value like an empty string or 0
        otherwise the data will be set to either null or undefined, which will cause errors when trying to 
        display it on the DOM
        */
    }, 
    weapon: {
        type: Schema.Types.ObjectId,    //this is how we link the weapon to the character
        ref: 'Weapon' //this is the name of the model we are linking to, ...model('name_of_model', schema_name)
    },
    user: {
        type: Schema.Types.ObjectId,   //this is how we link the user to the character
        ref: 'User' //this is the name of the model we are linking to, ...model('name_of_model', schema_name)
    },

});
     /* 
    
     this is a model, this is how we will interact with the database on the DOM and whats sent to the database 
     when we create a new character.
     
     you can change it to the things you want, but when we create a new character, inputs
     for all these fields ( and whatever you choose to add ) will show up on the DOM for the user to input, which will
     then be sent to the database. we will then Pull this object from the DB by _.id and display its data on the 
     character sheet page. 

     --> ALL <-- the inputs you want from the user should be specified here, and the type of data it should be.
     
     mongoDB automatically creates a unique _.id for each object in the DB, so you dont have
     to worry about adding that in the model. for things like weapons, we will have to create a weapon model and
     link it to the character model, so that when we create a new character, we can select a weapon from the weapons
     we have in the DB. we will also have to create a user model, so that when we create a new character, we can link
     it to a user.

     if you have any questions, just ask. 
    
    */

   mongoose.model('Character', characterSchema); //dont change this line ...model('name_of_model', schema_name)