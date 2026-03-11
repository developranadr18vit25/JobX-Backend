const path=require("path");
const express=require("express");
const router=express.Router();
const loginController=require("../controllers/loginController.js");


router.route("/oldUser")
    .post(loginController.handleLogin)

module.exports=router;
