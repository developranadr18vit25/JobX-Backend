const path=require('path');
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const {currUser}=require("../model/schemas");


const handlePwdChange=(async (req,res)=>{
    const enteredOldPwd=req.body.OldPassword;
    const enteredNewPwd=req.body.NewPassword;
    const userid=req.user.UserId; // WAY TO ACCESS THE decoded of the access token

    const userDoc=await currUser.findOne({UserId:userid});

    const dbPwd=userDoc.Password;

    const pwdMatch= await bcrypt.compare(enteredOldPwd,dbPwd);

    if(pwdMatch){
        const hashedNewPassword=await bcrypt.hash(enteredNewPwd,10);
        await currUser.updateOne({UserId:userid} , {$set:{Password:hashedNewPassword}});
        return res.json({
            message:"New Password updated Successfully"
        })
    }
    else{
        return res.json({
            message:"Incorrect password"
        })
    }
})

module.exports={handlePwdChange};