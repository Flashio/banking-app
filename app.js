const express = require('express')
const app = express()

// Middlewares
app.use(express.json())


// Routes
const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Banking App Api Running'))

module.exports = app