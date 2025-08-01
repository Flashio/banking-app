const app = require('./app') //import app.js
const mongoose = require('mongoose') //import mongoose
require('dotenv').config() //load variables from .env

const PORT = process.env.PORT || 3000 //read port from .env or default to 3000

console.log("Starting server...")

mongoose.connect(process.env.MONGO_URI) //connect app to MongoDB using the URI in .env

//check if the connection is successful 
.then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => {
        console.log('Server running on port ' + PORT)
    })
})

.catch(err => console.error('MongoDB connection error:', err)) //catch connection errors