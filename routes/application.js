const express = require("express");
const router = express.Router();
const path = require("path");
const applicationController = require("../controllers/applicationController");
const verification=require("../jwt/verification");


router.route("/posted")
    .post(applicationController.handleApplication)

module.exports = router;