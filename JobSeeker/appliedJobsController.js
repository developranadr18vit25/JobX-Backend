const path=require("path");
const fs=require("fs");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const { config } = require("dotenv");
require("dotenv").config();
const {appliedJobs , userProfile}=require("../model/schemas");

const handleApply = (async(req, res) => {
    const token=req.headers.authorization.split(" ")[1];
    const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    const userId=decoded.UserId;   
    const jobId=Number(req.body.JobId);

    await appliedJobs.create({JobId:jobId , UserId:userId , Status:"Pending"});

    return res.json({
        message:"Job applied Successfully"
    });
})

const handleApplicants=(async(req,res)=>{
    const jobid=req.params.jobid;

    const applicants=await appliedJobs.find({JobId:jobid});
    const userids=applicants.map(e=>e.UserId);

    const detailOfApplicant= await userProfile.find({UserId:{$in:userids}});

    return res.json(detailOfApplicant);
})

module.exports={handleApply , handleApplicants}