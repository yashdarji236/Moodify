const redis = require('ioredis').default
const Redis = new redis({
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    password:process.env.REDIS_PASSWORD
})

Redis.on("connect",()=>{
    console.log("Server is connected to redis");
    
})


module.exports = Redis