// const appliedDB = {
//     data: require("../model/appliedJobs.json")
// }

// const jobsDB = {
//     jobs: require("../model/newJobs.json")
// }

const path = require("path");
const fsPromises = require("fs").promises;
const mongoose=require("mongoose");

const handleApplication = (async (req, res) => {
    const company=req.body.Company;
    const title=req.body.Title;
    const location=req.body.Location;
    const salary=req.body.Salary;

    const newJob=mongoose.connection.collection("availableJobs");
    const count=await newJob.countDocuments();

    const latestJob=await newJob.findOne({} , {sort:{JobId:-1}});

    const lastJobId=count>0?latestJob.JobId:0;

    await newJob.insertOne({JobId:lastJobId+1 , Company:company , Title:title,  Location:location , Salary:salary});

    res.json({
        message: "Job Posted Successfully"
    })

})

module.exports = { handleApplication };