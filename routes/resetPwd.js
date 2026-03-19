const express=require("express");
const router=express.Router();
const path=require("path");
const resetPwdController=require("../Common/resetPwdController");
const verification=require("../jwt/verification");


router.route('/Password')
    .post(verification.verifyJWT, resetPwdController.handlePwdChange)

module.exports=router;