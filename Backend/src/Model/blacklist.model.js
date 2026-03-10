const mongoose = require('mongoose')

const blackListSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true , "token is required for black list."]
    }
},{
    timestamps: true
})

const BlackListModel = mongoose.model("blackList", blackListSchema)

module.exports = BlackListModel