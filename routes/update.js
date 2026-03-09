const express=require("express");
const router=express.Router();
const path=require("path");
const updateController=require("../controllers/updateController");
const verifyRoles=require("../roles/verifyRoles");

router.route("/:id/:jobid")
    .put(verifyRoles.isAdmin,updateController.handleUpdate);

module.exports=router;    