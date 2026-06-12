const path = require("path");
const mongoose = require("mongoose");
const { appliedJobs, newJobs } = require("../model/schemas");
const buildQuery = require("../utils/buildQuery")

const handleDisplayJobs = (async (req, res) => {

    try {
        const { title, company, location, minSalary, maxSalary, minExp, maxExp, status, JobType, skills } = req.query;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;

        const skip = (page - 1) * limit;

        let query = buildQuery(req.query);

        const allJobs = await newJobs.find(query).skip(skip).limit(limit);
        return res.status(200).json({
            Jobs: allJobs
        });

    } catch (error) {
        console.log(error);
    }
})


const handleDetailJob = (async (req, res) => {

    const jobid = req.params.JobId;

    const job = await newJobs.find({ JobId: jobid });

    return res.status(200).json({
        Job: job
    });

})

module.exports = { handleDisplayJobs, handleDetailJob };