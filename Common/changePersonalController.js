const express=require("express");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const {currUser}=require("../model/schemas")

const changePersonalData=(async(req,res)=>{

    const token=req.headers.authorization.split(" ")[1];
    const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    const userid=Number(decoded.UserId);
    const updatedData=req.body;

    await currUser.updateOne({UserId:userid} , {$set:updatedData});

    return res.json({
        mesage:"Credentials updated Successfully"
    })
})

module.exports={changePersonalData}


// TASK FOR 19 MARCH IS FIX THE SCHEMAS AND CHECK THAT THEY WORK PROPERLY