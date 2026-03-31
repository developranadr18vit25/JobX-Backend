const path = require("path");
const mongoose = require("mongoose");
const { appliedJobs, newJobs } = require("../model/schemas");
const buildQuery=require("../utils/buildQuery")

const handleDisplayJobs = (async (req, res) => {
    const mode = req.body.Mode;
    const userid=req.user.UserId;
    const { title, company, location , minSalary , maxSalary , yearsOfExp ,status } = req.query;
    const page=req.query.page||1;
    const limit=req.query.limit||10;

    const skip=(page-1)*limit;

    let query=buildQuery(req.query);

    if (mode == "available") {

        const allJobs = await newJobs.find(query).skip(skip).limit(limit);
        return res.status(200).json(allJobs);
    }
    else {
        const applied = await appliedJobs.find({UserId:userid , ...query}).skip(skip).limit(limit);
        const jobids = applied.map(e => e.JobId);

        const statusMap=new Map();
        applied.forEach(a=>{
            statusMap.set(a.JobId , a.Status)
        })

        if("Status" in query){
            query={};
        }

        const correspondingJobs = await newJobs.find({ JobId: { $in: jobids } , ...query});

        const result=correspondingJobs.map(job=>({
            ...job.toObject(),
            Status:statusMap.get(job.JobId)
        }));

        return res.status(200).json(result);
    }

})

module.exports = { handleDisplayJobs };