const express = require('express')
const upload = require('../middleware/upload.middleware')
const Router = express.Router()
const controller = require('../Controller/song.controller')

Router.post('/' , upload.single("song") , controller.uploadController)
Router.get('/' , controller.getSongs)
module.exports = Router