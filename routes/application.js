const express = require("express");
const router = express.Router();
const path = require("path");
const applicationController = require("../controllers/applicationController");
const verification=require("../jwt/verification");


router.route("/applied/:id/:availableid")
    .post(verification.verifyJWT,applicationController.handleApplication)

module.exports = router;