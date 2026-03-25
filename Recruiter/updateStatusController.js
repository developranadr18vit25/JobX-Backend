const mongoose=require("mongoose");
const verification=require("../jwt/verification");
const {appliedJobs}=require("../model/schemas");


const handleUpdateStatus=(async(req,res)=>{
    const userid=Number(req.params.userid);
    const jobid=Number(req.params.jobid);
    const status=req.body.Status;

    const result = await appliedJobs.updateOne({UserId:userid,JobId:jobid} , {$set:{Status:status}});

    if(status=="Shortlisted"){
        return res.json({
            meesage:"Applicant Shortlisted"
        })
    }
    else{
        return res.json({
            message:"Applicant Rejected"
        })
    }
})

module.exports={handleUpdateStatus}