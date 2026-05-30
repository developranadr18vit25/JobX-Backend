const mongoose=require("mongoose");
const {appliedJobs,newJobs}=require("../model/schemas");



const displayAppliedJobs=(async(req,res)=>{
    const userid=req.user.UserId;

    const jobs=await appliedJobs.find({UserId:userid});

    const jobIds=jobs.map(job=>job.JobId);

    const corrJobs=await newJobs.find({JobId:{$in:jobIds}})

    if(jobs.length===0){
        return res.status(204).json({
            Message:"No Jobs applied"
        })
    }

    return res.status(201).json({
        TotalApplications:jobs.length,
        Pending:jobs.filter(job=>job.Status==="Pending").length,
        Shortlisted:jobs.filter(job=>job.Status==="Shortlisted").length,
        Rejected:jobs.filter(jobs=>jobs.Status==="Rejected").length,
        AppliedJobs:corrJobs
    })

})

module.exports={displayAppliedJobs};