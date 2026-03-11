const userDB={
    content:require("../model/usersDB")
}

const path=require("path");
const mongoose=require("mongoose");

const handleDisplay=(async(req,res)=>{
    const id=Number(req.params.id);


    const currUser=mongoose.connection.collection("users");

    const data= await currUser.findOne({UserId:id});

    res.json(data);
})

module.exports={handleDisplay};