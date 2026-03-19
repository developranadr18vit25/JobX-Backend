const path=require("path");
const express=require("express");
const router=express.Router();
const loginController=require("../Common/loginController.js");


router.route("/oldUser")
    .post(loginController.handleLogin)

module.exports=router;
