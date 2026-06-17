const path=require("path");
const fs=require("fs");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const { config } = require("dotenv");
require("dotenv").config();
const {appliedJobs , userProfile}=require("../model/schemas");
const buildFilter=require("../utils/buildFilter");

const handleApply = (async(req, res) => {
    const token=req.headers.authorization.split(" ")[1];
    const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    const userId=decoded.UserId;   
    const jobId=Number(req.body.JobId);
    const resumeLink=req.body.ResumeLink;
    const message=req.body.Message;
    const email=req.body.Email;

    const duplicate=await appliedJobs.findOne({JobId:jobId , UserId:userId});

    if(duplicate){
        return res.status(409).json({
            message:"Job already applied"
        })
    }

    await appliedJobs.create({JobId:jobId , UserId:userId , Email:email, ResumeLink:resumeLink , Message:message,  Status:"Pending" , AppliedOn:new Date()});

    console.log("Job Applied")

    return res.status(201).json({
        message:"Job applied Successfully"
    });
})

const handleApplicants=(async(req,res)=>{

    const jobid=Number(req.params.jobid);
    const page=Number(req.query.page)||1;
    const limit=Number(req.query.limit)||10;
    const skip=(page-1)*limit;
    // const {minExperience,maxExperience, status, keyword}=req.query;

    // let filter=buildFilter(req.query);

    const applicants=await appliedJobs.aggregate([
        {
            $match:{JobId:jobid}
        }, 
        {
            $lookup:{
                from:"userProfile",
                localField:"UserId",
                foreignField:"UserId",
                as:"jobApplicants"
            }
        },
        {
            $unwind:"$jobApplicants"
        },
        {
            $project:{
                JobId:1,
                UserId:1,
                Name:"$jobApplicants.Name",
                Age:"$jobApplicants.Age",
                Qualification:"$jobApplicants.Qualification",
                Skills:"$jobApplicants.Skills",
                Experience:"$jobApplicants.Experience"

            }
        }
    ])

    return res.status(200).json({
        Applicants:applicants
    });
})

const alreadyApplied=(async (req,res)=>{

    const jobid=Number(req.body.JobId);
    const token=req.headers.authorization.split(" ")[1];
    const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    const userId=decoded.UserId;

    const duplicate=await appliedJobs.findOne({JobId:jobid , UserId:userId});

    if(duplicate){
        return res.status(201).json({
            Applied:true
        })
    };

    return res.status(201).json({
        Applied:false
    })
})

module.exports={handleApply , handleApplicants , alreadyApplied}