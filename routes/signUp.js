const path=require("path");
const express=require("express");
const app=express();
const router=express.Router();
const signUpController=require("../Common/signUpController");


router.route("/newUser")
    .post(signUpController.handleSignUp);

module.exports=router;    