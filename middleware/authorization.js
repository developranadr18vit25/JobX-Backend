const jwt = require("jsonwebtoken");
require("dotenv").config()

const handleAuthorization = ((...allowedRoles) => {
    return (req, res, next) => {

        if(!req.user.Roles){
            return res.json("yoyo")
        }

        const hasRole=req.user.Roles.some(el=>
            allowedRoles.includes(el)
        )

        if(!hasRole){
            return res.status(403).json({
                message:"Access Denied"
            })
        }
        next();
    }
})

module.exports={handleAuthorization}