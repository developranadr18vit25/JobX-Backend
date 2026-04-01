const express=require("express");
const router=express.Router();
const changePersonalController=require("../Common/changePersonalController");
const verification=require("../middleware/authentication");


router.route("/update")
    .put(verification.verifyJWT,changePersonalController.changePersonalData);

module.exports=router;    