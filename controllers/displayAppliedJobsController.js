const mongoose=require("mongoose");
const {appliedJobs,newJobs}=require("../model/schemas");



const displayAppliedJobs=(async(req,res)=>{
    const userid=req.user.UserId;

    const jobs=await appliedJobs.find({UserId:userid});

    if(jobs.length===0){
        return res.status(204).json({
            Message:"No Jobs applied"
        })
    }

    const jobsApplied=await appliedJobs.aggregate([
        {
            $match:{UserId:userid}
        },
        {
            $lookup:{
                from:"newjobs",
                localField:"JobId",
                foreignField:"JobId",
                as:"jobDetails"
            }
        } , 
        {
            $unwind:"$jobDetails"
        },
        {
            $project:{
                JobId:1,
                AppliedOn:1,
                Status:1,
                Company:"$jobDetails.Company",
                Title:"$jobDetails.Title",
                Location:"$jobDetails.Location",
                JobType:"$jobDetails.JobType"
            }
        }
    ]);

    return res.status(201).json({
        TotalApplications:jobs.length,
        Pending:jobs.filter(job=>job.Status==="Pending").length,
        Shortlisted:jobs.filter(job=>job.Status==="Shortlisted").length,
        Rejected:jobs.filter(jobs=>jobs.Status==="Rejected").length,
        AppliedJobs:jobsApplied
    })

})

module.exports={displayAppliedJobs};