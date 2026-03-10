const mongoose = require('mongoose')
const userAuth = new mongoose.Schema({
    username:{
        type:String,
        unique:[true , "Username is already exist"],
        required:[true , 'Username is required!']
    },
    email:{
        type:String,
        unique:[true , "Email is already exist"],
        required:[true , 'Email is required!']
    },
    password:{
        type:String,
        required:[true , "password is required!"],
        select:false
    }
})


const userModel = mongoose.model("users" , userAuth)
module.exports = userModel