const path=require("path");
const express=require("express");
const router=express.Router();
const applyController=require("../JobSeeker/appliedJobsController");
const updateStatusController=require("../")
const verification=require("../jwt/verification");
const verifyRoles=require("../roles/verifyRoles");

router.route("/newJob")
    .post(verification.verifyJWT,applyController.handleApply); 

router.route("/:jobid/applicants")
    .get(verification.verifyJWT, applyController.handleApplicants)

// router.route("/:jobid/applicants/:userid/status")
//     .put()
    

module.exports=router;    