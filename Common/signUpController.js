const path = require("path");
const fsPromises = require("fs").promises;
const bcrypt=require("bcrypt");
const mongoose=require("mongoose");
const {currUser}=require("../model/schemas");

const handleSignUp = ( async (req, res) => {
    const Username = req.body.Username;
    const Pwd = req.body.Password;
    const purpose=req.body.Purpose;

    if (!Username || !Pwd) {
        res.json({ Message: "Both Username and Password are required" });
    }

    const hashedPwd=await bcrypt.hash(Pwd,10);

    const duplicate =  await currUser.findOne({Username:Username});

    if (duplicate) {
        return res.status(409).json({
            message: "Account already exists"
        });
    }

    const count= await currUser.countDocuments();

    const latestUser = await currUser.findOne().sort({ UserId: -1 });

    const prevUserId=count>0?latestUser.UserId:0;

    await currUser.insertOne({Username:Username , Password:hashedPwd , UserId:prevUserId+1 , Purpose:purpose});


    res.json({ msg: "User created" });
})

module.exports = {handleSignUp};