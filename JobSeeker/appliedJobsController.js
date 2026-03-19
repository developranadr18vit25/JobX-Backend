const path=require("path");
const fs=require("fs");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const { config } = require("dotenv");
require("dotenv").config();
const {appliedJobs}=require("../model/schemas");

const handleApply = (async(req, res) => {
    const token=req.headers.authorization.split(" ")[1];
    const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    const userId=decoded.UserId;   
    const jobId=req.body.JobId;

    await appliedJobs.insertOne({JobId:jobId , UserId:userId});

    return res.json({
        message:"Job applied Successfully"
    });

})

module.exports={handleApply}