const path = require("path");
const mongoose = require("mongoose");
const { appliedJobs, newJobs } = require("../model/schemas");
const buildQuery=require("../utils/buildQuery")

const handleDisplayJobs = (async (req, res) => {
    const mode = req.body.Mode;
    const userid=req.user.UserId;
    const { title, company, location , minSalary , maxSalary , yearsOfExp } = req.query;

    const query=buildQuery(req.query);

    if (mode == "available") {

        const allJobs = await newJobs.find(query);
        return res.json(allJobs);

    }
    else {
        const applied = await appliedJobs.find({UserId:userid});
        const jobids = applied.map(e => e.JobId);

        const statusMap=new Map();
        applied.forEach(a=>{
            statusMap.set(a.JobId , a.Status)
        })

        const correspondingJobs = await newJobs.find({ JobId: { $in: jobids } , ...query});

        const result=correspondingJobs.map(job=>({
            ...job.toObject(),
            Status:statusMap.get(job.JobId)
        }));

        return res.json(result);
    }

})

module.exports = { handleDisplayJobs };