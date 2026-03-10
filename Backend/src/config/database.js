const mongoose = require('mongoose')
function Connect(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connect to Database");
        
    })
}


module.exports = Connect