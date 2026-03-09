const userDB={
    content:require("../model/usersDB.json")
}

const path=require("path");
const jwt=require("jsonwebtoken")
require("dotenv").config();

const handleRefreshToken=((req,res)=>{
    const frontendRefreshToken=req.cookies.jwt;

    if(!frontendRefreshToken) return res.sendStatus(401);

    const currentUser=userDB.content.users.find((person)=>person.refreshToken==frontendRefreshToken);

    if(!currentUser) return res.sendStatus(403);

    jwt.verify(
        frontendRefreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err || decoded.Userid !== currentUser.Userid){
                return res.sendStatus(403);
            }

            const accessToken=jwt.sign(
                {"UserId":decoded.Userid},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:"1h"}
            )

            res.json(accessToken);
        }
    )
})

module.exports={handleRefreshToken};