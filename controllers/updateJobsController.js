const express=require("express");
const mongoose=require("mongoose");

const handleJobUpdate=(async (req,res)=>{

    const updatedData=req.body;
    const jobid=Number(req.params.JobId);

    const availableJobs=mongoose.connection.collection("availableJobs");

    await availableJobs.updateOne({JobId:jobid} , {$set:updatedData});

    return res.json({
        message:"Selected fields updated Successfully"
    })
})

module.exports={handleJobUpdate}