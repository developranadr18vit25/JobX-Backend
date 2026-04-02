const express=require("express");
const router=express.Router();
const path=require("path");
const refreshController=require("../controllers/refreshController");


router.route("/newToken")
    .get(refreshController.handleRefreshToken)

module.exports=router;    