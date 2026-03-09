const express=require("express");
const router=express.Router();
const path=require("path");
const refreshController=require("../controllers/refreshController");


router.route("/newToken")
    .post(refreshController.handleRefreshToken)

module.exports=router;    