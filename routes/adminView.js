const express=require("express");
const path=require("path");
const router=express.Router();
const adminViewController=require("../controllers/adminViewController");

router.route("/DbView")
    .get(adminViewController.handleAdminView)


module.exports=router;    