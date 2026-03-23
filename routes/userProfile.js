const express=require("express");
const router=express.Router();
const userProfileController=require("../JobSeeker/userProfileController");
const verification=require("../jwt/verification");

router.route("/profile")
    .post(verification.verifyJWT,userProfileController.handleUserProfile)


module.exports=router;