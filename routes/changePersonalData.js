const express=require("express");
const router=express.Router();
const changePersonalController=require("../Common/changePersonalController");
const authorization=require("../middleware/authorization");
const verification=require("../middleware/authentication");


router.route("/update") // BOTH RECRUITER AND APPLICANT CAN CHANGE THEIR CREDENTIALS
    .put(verification.verifyJWT, authorization.handleAuthorization("Applicant", "Recruiter"),changePersonalController.changePersonalData);

module.exports=router;    