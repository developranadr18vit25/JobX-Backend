// const userDB={
//     content:require("../model/usersDB")
// }

const path=require("path");
const mongoose=require("mongoose");

const handleDisplayJobs=(async(req,res)=>{
    const mode=req.body.Mode;


    const availableJobs=mongoose.connection.collection("availableJobs");
    const appliedJobs=mongoose.connection.collection("appliedJobs");

    if(mode=="available"){
        const allJobs=await availableJobs.find().toArray();
        return res.json(allJobs);
    }
    else{
        
    }

})

module.exports={handleDisplayJobs};