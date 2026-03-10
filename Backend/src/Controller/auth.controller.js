const userModel = require('../Model/auth.model')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const BlacListkModel = require("../Model/blacklist.model")


async function RegisterContoller(req,res){
    const {username , email , password} = req.body;
    const IsUserExist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(IsUserExist){
        return res.status(409).json({
            message: (IsUserExist.email) == email ? "Email is already exist" : "Usename is already exist"
        })

    }
    const hash = await bcryptjs.hash(password , 10)
    const user = await userModel.create({
        username , 
        email ,
        password:hash
    })


    const token = jwt.sign({
        id:user._id,
        username:user.username
    } , process.env.JWT_SECRET , {expiresIn:'1d'})

     res.cookie('token', token);
    res.status(200).json({
        user: {
            email: user.email,
            username: user.username,
        }
    })
}

async function LoginController(req,res){
    const { username , email , password } = req.body;
    const user = await userModel.findOne({
        $or:[
            {username:username},
            {email:email}
        ]
    }).select("+password")

    if(!user){
        return res.status(404).json({
            message:"User is not Exist"
        })

    }

    const ValidPassword = await bcryptjs.compare(password , user.password)
    if(!ValidPassword){
        return res.status(401).json({
            message:"Password is invalid"
        })
    }

    const token = jwt.sign({
        id:user._id,
        username:user.username
    } , process.env.JWT_SECRET , {expiresIn:'1d'})

    res.cookie("token" , token)
    res.status(200).json({
        message:"User successfully LoggedIn",
        user
    })

}

async function GetMe(req,res){
    const userId = req.user.id
    const user = await userModel.findById(userId).select("-password")
    res.status(200).json({
        message:"user Data successFully fetched",
        user
    })

}

async function Logout(req,res){
    const token = req.cookies.token
    res.clearCookie("token")
    await BlacListkModel.create({token})
    res.status(201).json({
        message:"Logout successfully!"
    })
}

module.exports = {
    RegisterContoller , LoginController , GetMe , Logout
}