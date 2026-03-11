const path=require("path");
const express=require("express");
const router=express.Router();
const displayController=require("../controllers/displayController");
const verify=require("../jwt/verification.js")

router.route("/:id")
    .get(displayController.handleDisplay)

module.exports=router;    