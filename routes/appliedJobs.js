const path=require("path");
const express=require("express");
const router=express.Router();
const applyController=require("../JobSeeker/appliedJobsController");
const verification=require("../jwt/verification");
const verifyRoles=require("../roles/verifyRoles");

router.route("/newJob")
    .post(verification.verifyJWT,applyController.handleApply); 

module.exports=router;    