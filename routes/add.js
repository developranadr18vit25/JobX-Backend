const path=require("path");
const express=require("express");
const router=express.Router();
const addController=require("../controllers/addController");
const verifyRoles=require("../roles/verifyRoles");

router.route("/:id")
    .post(addController.handleAdd); 

module.exports=router;    