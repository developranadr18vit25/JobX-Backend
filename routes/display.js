const path=require("path");
const express=require("express");
const router=express.Router();
const displayController=require("../controllers/displayJobsController.js");
const verification=require("../middleware/authentication.js");
const authorization=require("../middleware/authorization.js");
const verify=require("../middleware/authentication.js")

router.route("/jobs") // USER CAN EITHER VIEW THE AVAILABLE JOBS OR THE APPLIED JOBS 
    .post(verification.verifyJWT,authorization.handleAuthorization("Applicant"), displayController.handleDisplayJobs)

module.exports=router;    