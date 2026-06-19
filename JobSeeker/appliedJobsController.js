const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
require("dotenv").config();
const { appliedJobs, userProfile } = require("../model/schemas");
const buildFilter = require("../utils/buildFilter");

const handleApply = (async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.UserId;
    const jobId = Number(req.body.JobId);
    const resumeLink = req.body.ResumeLink;
    const message = req.body.Message;
    const email = req.body.Email;

    const duplicate = await appliedJobs.findOne({ JobId: jobId, UserId: userId });

    if (duplicate) {
        return res.status(409).json({
            message: "Job already applied"
        })
    }

    await appliedJobs.create({ JobId: jobId, UserId: userId, Email: email, ResumeLink: resumeLink, Message: message, Status: "Pending", AppliedOn: new Date() });

    console.log("Job Applied")

    return res.status(201).json({
        message: "Job applied Successfully"
    });
})

const handleCountApplicants = (async (req, res) => {

    const jobids = req.body.jobIDs;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const applicants = await appliedJobs.aggregate([
        {
            $match: { JobId: { $in: jobids } }
        },
        {
            $group: {
                _id: "$JobId",
                count: { $sum: 1 }
            }

        }
    ])

    const applicantMap = new Map();

    applicants.forEach(appl => {
        applicantMap.set(appl._id, appl.count);
    });

    const result = jobids.map(jobId => ({
        JobId: jobId,
        Count: applicantMap.get(jobId) || 0
    }));

    return res.status(200).json({
        Applicants: result
    });
})

const handleDetailApplicants = (async (req, res) => {
    const jobid = Number(req.params.jobId);

    try {
        const applicantDetails = await appliedJobs.aggregate([
            {
                $match: {
                    JobId: jobid
                }
            },
            {
                $lookup: {
                    from: "userProfile",
                    localField: "UserId",
                    foreignField: "UserId",
                    as: "applicant"
                }
            },
            {
                $unwind: "$applicant"
            },
            {
                $project: {
                    JobId: 1,
                    UserId: 1,
                    Name: "$applicant.Name",
                    Age: "$applicant.Age",
                    Qualification: "$applicant.Qualification",
                    Skills: "$applicant.Skills",
                    Experience: "$applicant.Experience"
                }
            }
        ])

        return res.status(200).json({
            Applicants: applicantDetails
        })

    } catch (error) {
        return res.status(500).json({
            message:"DB Error Occurred"
        })
    }
})

const alreadyApplied = (async (req, res) => {

    const jobid = Number(req.body.JobId);
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.UserId;

    const duplicate = await appliedJobs.findOne({ JobId: jobid, UserId: userId });

    if (duplicate) {
        return res.status(201).json({
            Applied: true
        })
    };

    return res.status(201).json({
        Applied: false
    })
})

module.exports = { handleApply, handleCountApplicants, alreadyApplied , handleDetailApplicants }