const express = require("express");
const router = express.Router();
const path = require("path");
const availableJobsController = require("../Recruiter/availableJobsController");
const authorization=require("../middleware/authorization");
const verification=require("../middleware/authentication");
const updateJobsController=require("../controllers/updateJobsController")

router.route("/posted") // RECRUITER CAN POST A JOB OPENING
    .post(verification.verifyJWT, authorization.handleAuthorization("Recruiter"),availableJobsController.handleApplication)

router.route("/update/:JobId") // RECRUITER CAN UPDATE THE DETAILS REGARDING THE JOB OPENING 
    .put(verification.verifyJWT, authorization.handleAuthorization("Recruiter"),updateJobsController.handleJobUpdate);

router.route("/status/:JobId") // RECRUITER CAN CHANGE THE STATUS OF THE JOB 
    .put(verification.verifyJWT, authorization.handleAuthorization("Recruiter"), availableJobsController.handleDeletion);

module.exports = router;