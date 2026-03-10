require('dotenv').config()
const app = require('./src/app')
const Connect = require('./src/config/database')
app.listen(3000,()=>{
    console.log("Server is Running");
    
})


Connect()