const express = require('express')
const cors = require('cors')
const cookie  = require('cookie-parser')
const SongRoute = require('./Routes/songs.route')
const AuthRoute = require('./Routes/Auth.Route')
const app = express()

app.use(express.json())
app.use(cors({
     credentials:true,
    origin:'http://localhost:5173'
}))
app.use(cookie())

app.use('/auth' , AuthRoute)
app.use('/songs' , SongRoute)

module.exports = app