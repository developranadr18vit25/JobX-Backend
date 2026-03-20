const path = require("path");
const fsPromises = require("fs").promises;
const mongoose=require("mongoose");
const {newJobs}=require("../model/schemas");

const handleApplication = (async (req, res) => {
    const company=req.body.Company;
    const title=req.body.Title;
    const location=req.body.Location;
    const salary=req.body.Salary;

    const count=await newJobs.countDocuments();

    const latestJob=await newJobs.findOne().sort({JobId:-1});

    const lastJobId=count>0?latestJob.JobId:0;

    await newJobs.insertOne({JobId:lastJobId+1 , Company:company , Title:title,  Location:location , Salary:salary});

    res.json({
        message: "Job Posted Successfully"
    })
})

module.exports = { handleApplication };