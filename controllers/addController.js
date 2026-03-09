const userDB = {
    content: require("../model/usersDB"),
    setJobs: function (data) {
        this.content.jobs = data;
    }
}

const path=require("path");
const fs=require("fs");

const handleAdd = ((req, res) => {
    const id = req.params.id;
    const company = req.body.Company;
    const location = req.body.Location;
    const status = req.body.Status;
    

    const userJobs = userDB.content.jobs.filter(job => job.Userid == id);
    
    const lastJobId=userJobs.length>0?userJobs[userJobs.length-1].Jobid:0;

    const currentJob = {
        "Userid":id,
        "Jobid":lastJobId+1,
        "Company":company,
        "Location":location,
        "Status":status
    }

    userDB.content.jobs.push(currentJob);

    userDB.content.jobs.sort((a, b) => {
        if (a.Userid === b.Userid) return a.Jobid - b.Jobid;
        return a.Userid - b.Userid;
    });

    res.json(currentJob);

    fs.writeFileSync(path.join(__dirname,"..","model","usersDB.json"), JSON.stringify(userDB.content,null,2));

})

module.exports={handleAdd}