const userDB = {
    content: require("../model/usersDB")
}

const path=require("path");

const isAdmin=((req,res,next)=>{
    const id=req.params.id;

    const currentUser=userDB.content.users.find((person)=>person.Userid==id);

    if(currentUser.Role.includes("Admin")){
        next();
    }
    else{
        return res.json({
            message:"Access Denied"
        })
    }
})

const isEditor=((req,res,next)=>{
    const id=req.params.id;

    const currentUser=userDB.content.users.filter((person)=>person.Userid==id);

    if(currentUser.Role.includes("Editor")){
        next();
    }
    else{
        return res.json({
            message:"Access Denied"
        })
    }
})

const isUser=((req,res,next)=>{
    const id=req.params.id;

    const currentUser=userDB.content.users.filter((person)=>person.Userid==id);

    if(currentUser.Role.includes("User")){
        next();
    }
    else{
        return res.json({
            message:"Access Denied"
        })
    }
})

module.exports={isAdmin,isEditor,isUser};

