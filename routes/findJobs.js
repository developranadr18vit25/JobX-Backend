const express=require("express");
const router=express.Router();
const path=require("path");
const findJobsController=require("../controllers/findJobsController");

router.route("/findJob")
    .get(findJobsController.handleFindJobs)

module.exports=router;