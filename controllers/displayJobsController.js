const path=require("path");
const mongoose=require("mongoose");
const {appliedJobs,newJobs}=require("../model/schemas");

const handleDisplayJobs=(async(req,res)=>{
    const mode=req.body.Mode;
    const {title,company,location}=req.query;

    let query={};

    if(mode=="available"){
        if(title){

            query.Title={$regex:title};

        }
        if(company){
            query.Company={$regex:company};
        }

        if(location){
            query.Location={$regex:location};
        }

        const allJobs=await newJobs.find(query);
        return res.json(allJobs);
        
    }
    else{
        const applied=await appliedJobs.find();
        const jobids=applied.map(e=>e.JobId);

        const correspondingJobs=await newJobs.find({JobId:{$in:jobids}});

        return res.json(correspondingJobs)
    }

})

module.exports={handleDisplayJobs};