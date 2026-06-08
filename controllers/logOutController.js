const mongoose=require("mongoose");
const {currUser}=require("../model/schemas")


const handleLogOut=(async(req,res)=>{
    const userid=req.user.UserId;

    const user=await currUser.findOne({UserId:userid});
    await currUser.updateOne({UserId:userid} , {$set:{refreshToken:""}});

    return res.status(200).json({
        CurrentUser:user,
        Message:"User logged out Successfully"
    })
})


module.exports={handleLogOut}