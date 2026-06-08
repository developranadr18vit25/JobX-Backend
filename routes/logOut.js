const path=require("path");
const express=require("express");
const router=express.Router();
const logOutController=require("../controllers/logOutController");
const verification=require("../middleware/authentication")


router.route("/site")
    .put(verification.verifyJWT, logOutController.handleLogOut);

module.exports=router;