const express = require('express')
const AuthRouter = express.Router()
const AuthController = require("../Controller/auth.controller")
const IdentifyUser = require('../middleware/auth.middleware')

AuthRouter.post("/register" , AuthController.RegisterContoller)
AuthRouter.post("/login" , AuthController.LoginController)
AuthRouter.get('/get-me' , IdentifyUser , AuthController.GetMe)
AuthRouter.get('/logout' , AuthController.Logout)
module.exports =     AuthRouter
