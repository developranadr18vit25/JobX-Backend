const userDB={
    content:require("../model/usersDB")
}

const path=require("path");

const handleDisplay=((req,res)=>{
    const id=req.params.id;

    res.json(userDB.content.jobs.filter((person)=>person.Userid==id));
})

module.exports={handleDisplay};