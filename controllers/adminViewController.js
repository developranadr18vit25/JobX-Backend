const userDB = {
    content: require("../model/usersDB"),
}

const path=require("path");

const handleAdminView=((req,res)=>{

    res.json(userDB.content);
})

module.exports={handleAdminView};

