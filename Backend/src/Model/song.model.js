const mongoose = require('mongoose')
const Song = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    posterUrl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    mood:{
        type:String,
        enum:{
            values:["sad" , "happy" , "suprised"],
            message:"This is Enum"
        }
    }
})
const SongModel = mongoose.model("Songs" , Song)
module.exports = SongModel