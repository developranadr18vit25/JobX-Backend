const path = require("path");
const fsPromises = require("fs").promises;
const mongoose=require("mongoose");
const {newJobs}=require("../model/schemas");

const handleApplication = (async (req, res) => {
    const company=req.body.Company;
    const title=req.body.Title;
    const location=req.body.Location;
    const salary=req.body.Salary;
    const jobtype=req.body.JobType;
    const experience=req.body.Experience;

    const count=await newJobs.countDocuments();

    const latestJob=await newJobs.findOne().sort({JobId:-1});

    const lastJobId=count>0?latestJob.JobId:0;

    const duplicate=await newJobs.findOne({Title:title , Company:company , Location:location });

    if(duplicate){
        return res.status(409).json({
            message:"Job already exists"
        })
    }

    await newJobs.insertOne({JobId:lastJobId+1 , Company:company , Title:title,  Location:location , Salary:salary , JobType:jobtype , Experience:experience , Status:"Active"});

    res.status(201).json({
        message: "Job Posted Successfully"
    })
})

const handleDeletion=(async(req,res)=>{
    const status=req.body.Status;
    const jobid=req.params.JobId;

    await newJobs.updateOne({JobId:jobid} , {$set:{Status:status}});

    res.status(200).json({
        message:"Job status updated Successfully"
    })
})

module.exports = { handleApplication , handleDeletion };