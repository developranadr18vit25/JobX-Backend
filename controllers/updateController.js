const userDB = {
    content: require("../model/usersDB"),
    setJobs: function (data) {
        this.content.jobs = data;
    }
}

const path = require('path');
const fsPromises = require("fs").promises;

const handleUpdate = (async (req, res) => {
    const userid = req.params.id;
    const jobid = req.params.jobid;

    const company = req.body.Company;
    const location = req.body.Location;
    const status = req.body.Status;

    const currentId = userDB.content.jobs.filter((person) => person.Userid == userid);
    const currentJob = currentId.find((person) => person.Jobid == jobid);

    if (!currentJob) {
        return res.status(404).json({ message: "Job not found" });
    }

    const newJob = {
        "Userid": userid,
        "Jobid": jobid,
        "Company": company,
        "Location": location,
        "Status": status
    }

    const notRelated = userDB.content.jobs.filter(job => !(job.Userid == userid && job.Jobid == jobid)
    );

    userDB.setJobs([...notRelated, newJob]);

    userDB.content.jobs.sort((a, b) => {
        if (a.Userid === b.Userid) return a.Jobid - b.Jobid;
        return a.Userid - b.Userid;
    });

    await fsPromises.writeFile(path.join(__dirname, "..", "model", "usersDB.json"), JSON.stringify(userDB.content,null,2));

    res.json(newJob);

})

module.exports = { handleUpdate };