const jwt=require("jsonwebtoken");
require("dotenv").config();
const mongoose=require("mongoose");
const {currUser}=require("../model/schemas");

const handleRefreshToken=(async(req,res,next)=>{
    const frontendRefreshToken=req.cookies.jwt;

    if(!frontendRefreshToken) return res.status(401).json("No refreshToken provided");
    console.log(frontendRefreshToken);

    const currentUser=await currUser.findOne({refreshToken:frontendRefreshToken});

    if(!currentUser) return res.status(403).json("No refreshToken match found");

    jwt.verify(
        frontendRefreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{

            if(err){
                return res.status(400).json("Error Occurred");
            }

            const accessToken=jwt.sign(
                {"UserId":currentUser.UserId , "Roles":currentUser.Roles},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:"1h"}
            )
            res.json(accessToken);
        }
    )
})

module.exports={handleRefreshToken};