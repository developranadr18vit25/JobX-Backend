const userDB = {
    content: require("../model/usersDB"),
}

const path=require("path");

const handleSearch=((req,res)=>{
    const keyWord=req.query.query;

    const lower=keyWord.toLowerCase();

    const result=userDB.content.jobs.filter((data)=>
    data.Company.toLowerCase().includes(lower) ||
    data.Location.toLowerCase().includes(lower) ||
    data.Status.toLowerCase().includes(lower));

    res.json(result);
})

module.exports={handleSearch};