const path = require("path");
const mongoose = require("mongoose");
const { appliedJobs, newJobs } = require("../model/schemas");
const buildQuery=require("../utils/buildQuery")

const handleDisplayJobs = (async (req, res) => {
    const mode = req.body.Mode;
    const { title, company, location , minSalary , maxSalary , yearsOfExp } = req.query;

    const query=buildQuery(req.query);

    if (mode == "available") {

        const allJobs = await newJobs.find(query);
        return res.json(allJobs);

    }
    else {
        const applied = await appliedJobs.find();
        const jobids = applied.map(e => e.JobId);

        const correspondingJobs = await newJobs.find({ JobId: { $in: jobids } , ...query});

        return res.json(correspondingJobs)
    }

})

module.exports = { handleDisplayJobs };