const jwt = require('jsonwebtoken')
const BlackListe = require('../Model/blacklist.model')
const Redis = require("../config/cache")
async function IdentiFyUser(req,res,next){
    const token  = req.cookies.token?.trim()


    if(!token){
        return res.status(401).json({
            message:"Token is not provided!"
        })
    }
    const IstokenblackeListed = await Redis.get(token , )
    if(IstokenblackeListed){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
    let decoded = null;
    try{
        decoded = jwt.verify( token , process.env.JWT_SECRET)
         req.user = decoded

    next()
    }catch(err){
         return res.status(401).json({
      message: "user not authorized!"
    })
    }
}



module.exports = IdentiFyUser