const path=require("path");
const express=require("express");
const router=express.Router();
const displayController=require("../controllers/displayJobsController.js");
const verification=require("../jwt/verification.js");
const verify=require("../jwt/verification.js")

router.route("/jobs") // USER CAN EITHER VIEW THE AVAILABLE JOBS OR THE APPLIED JOBS 
    .post(verification.verifyJWT,displayController.handleDisplayJobs)

module.exports=router;    