const jwt = require("jsonwebtoken");
require("dotenv").config()

const handleAuthorization = ((...allowedRoles) => {
    return (req, res, next) => {
        

        const hasRole=allowedRoles.includes(req.user.Roles)

        if(!hasRole){
            return res.status(403).json({
                message:"Access Denied"
            })
        }
        next();
    }
})

module.exports={handleAuthorization}