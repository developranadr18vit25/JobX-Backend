const path=require("path");
const express=require("express");
const router=express.Router();
const applyController=require("../JobSeeker/appliedJobsController");
const updateStatusController=require("../Recruiter/updateStatusController")
const verification=require("../middleware/authentication");
const verifyRoles=require("../roles/verifyRoles");
const authorization=require("../middleware/authorization")

router.route("/newJob") //  USER APPLY FOR A JOB
    .post(verification.verifyJWT, authorization.handleAuthorization("Applicant"), applyController.handleApply); 

router.route("/:jobid/applicants")  // RECRUITER VIEWS APPLICANT FOR RESPECTIVE JOB 
    .get(verification.verifyJWT, authorization.handleAuthorization("Recruiter"),applyController.handleApplicants)

router.route("/:jobid/applicants/:userid/status") // RECRUITER CAN CHANGE THE STATUS OF THE APPLICANT
    .put(verification.verifyJWT, authorization.handleAuthorization("Recruiter"), updateStatusController.handleUpdateStatus)

router.route("/:jobid/applicants/withdrawn") // APPLICANT CAN WITHDRAW HIS APPLICATION BY CHANGING STATUS IN THE DB TO WITHDRAWN 
    .put(verification.verifyJWT, authorization.handleAuthorization("Applicant"), updateStatusController.handleWithdrawApplication)


module.exports=router;    