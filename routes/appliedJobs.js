const path=require("path");
const express=require("express");
const router=express.Router();
const applyController=require("../JobSeeker/appliedJobsController");
const updateStatusController=require("../Recruiter/updateStatusController")
const verification=require("../jwt/verification");
const verifyRoles=require("../roles/verifyRoles");

router.route("/newJob") //  USER APPLY FOR A JOB
    .post(verification.verifyJWT,applyController.handleApply); 

router.route("/:jobid/applicants")  // RECRUITER VIEWS APPLICANT FOR RESPECTIVE JOB 
    .get(verification.verifyJWT,applyController.handleApplicants)

router.route("/:jobid/applicants/:userid/status") // RECRUITER CAN CHANGE THE STATUS OF THE APPLICANT
    .put(verification.verifyJWT,updateStatusController.handleUpdateStatus)

router.route("/:jobid/applicants/withdrawn") // APPLICANT CAN WITHDRAW HIS APPLICATION BUT CHANGING STATUS IN THE DB TO WITHDRAWN 
    .put(verification.verifyJWT, updateStatusController.handleWithdrawApplication)


module.exports=router;    