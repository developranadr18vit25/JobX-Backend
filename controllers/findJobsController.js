const jobsDB={
    jobs:require("../model/newJobs.json")
}

const path=require("path");


const handleFindJobs=((req,res)=>{
    res.json(jobsDB.jobs)
})

module.exports={handleFindJobs}