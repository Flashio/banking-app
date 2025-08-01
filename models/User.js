const mongoose = require('mongoose') //import mongoose library to talk to mongoDB

//create a schema for users
const userSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        emum: ['customer', 'admin'],
        default: 'customer',
    },

}, {timelapse: true})

module.exports = mongoose.model('User', userSchema)