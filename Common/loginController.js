const path=require("path");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const bcrypt=require("bcrypt");
const { hash } = require("crypto");
const fsPromises=require("fs").promises;
const mongoose=require("mongoose");
const {currUser}=require("../model/schemas")

const handleLogin=(async(req,res)=>{
    const Username=req.body.Username;
    const Pwd=req.body.Password;

    if(!Username || !Pwd){
        res.json({
            message:"Both username and password are required"
        })
    }

    const UsernameMatch=await currUser.findOne({Username:Username});

    if(!UsernameMatch){
         return res.status(404).json({
            message:"User doesn't exist"
        })
    }

    const PwdMatch=await bcrypt.compare(Pwd,UsernameMatch.Password);

    if(!PwdMatch){
        return res.status(401).json({
            message:"Incorrect Password"
        })
    }

    const accessToken=jwt.sign(
        {"UserId":UsernameMatch.UserId , "Roles":UsernameMatch.Roles},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'1h'}
    );

    const refreshToken=jwt.sign(
        {"UserId":UsernameMatch.UserId , "Roles":UsernameMatch.Roles},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:'1d'}
    )

    await currUser.updateOne({Username:Username} , {$set:{refreshToken:refreshToken}});

    res.clearCookie("jwt");
    
    res.cookie("jwt",refreshToken,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge: 24 * 60 * 60 * 1000
    })


    res.status(200).json(accessToken);
})

module.exports={handleLogin};