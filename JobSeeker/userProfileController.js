const mongoose=require("mongoose");
const {userProfile}=require("../model/schemas");

const handleUserProfile=(async(req,res)=>{
    const name =req.body.Name;
    const age=req.body.Age;
    const qualification=req.body.Qualification;
    const skills=req.body.Skills;
    const experience=req.body.Experience;
    const userid=req.user.UserId;

    await userProfile.create({ UserId:userid ,Name:name , Age:age , Qualification:qualification , Skills:skills , Experience:experience});

    return res.json({
        message:"Profile updated Successfully"
    })

})

module.exports={handleUserProfile};