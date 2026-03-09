// const userDB = {
//     content: require("../model/usersDB"),
//     setUsers: function (data) {
//         this.content.users=data;
//     }
// }

const path = require("path");
const fsPromises = require("fs").promises;
const bcrypt=require("bcrypt");
const mongoose=require("mongoose");

const handleSignUp = ( async (req, res) => {
    const Username = req.body.Username;
    const Pwd = req.body.Password;

    const newUser=mongoose.connection.collection("users");

    if (!Username || !Pwd) {
        res.json({ Message: "Both Username and Password are required" });
    }

    const hashedPwd=await bcrypt.hash(Pwd,10);

    const duplicate =  await newUser.findOne({Username:Username});

    if (duplicate) {
        return res.status(409).json({
            message: "Account already exists"
        });
    }

    const count= await newUser.countDocuments();


    const prevUserId=count>0?newUser.findOne({Username:Username}).Userid:0;

    // const prevUserId=userDB.content.users.length>0?userDB.content.users[userDB.content.users.length-1].Userid:0;

    // const otherUsers = userDB.content.users.filter((person) => person.Username !== Username);
    const currentUser = {
        "Username": req.body.Username,
        "Password": hashedPwd,
        "Userid":(Number(prevUserId)+1).toString()
    }

    await newUser.insertOne({Username:Username , Password:hashedPwd , UserId:prevUserId+1});

    // fsPromises.writeFile(path.join(__dirname, "..", "model", "usersDB.json"), JSON.stringify(userDB.content, null, 2));

    res.json({ msg: "User created" });
})

module.exports = {handleSignUp};