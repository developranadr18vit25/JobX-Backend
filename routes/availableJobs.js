const express = require("express");
const router = express.Router();
const path = require("path");
const availableJobsController = require("../Recruiter/availableJobsController");
const verification=require("../jwt/verification");
const updateJobsController=require("../controllers/updateJobsController")

router.route("/posted")
    .post(availableJobsController.handleApplication)

router.route("/update/:JobId")
    .put(updateJobsController.handleJobUpdate);

module.exports = router;