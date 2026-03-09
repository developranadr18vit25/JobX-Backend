const appliedDB = {
    data: require("../model/appliedJobs.json")
}

const jobsDB = {
    jobs: require("../model/newJobs.json")
}

const path = require("path");
const fsPromises = require("fs").promises;

const handleApplication = (async (req, res) => {
    const currentUser = req.params.id;
    const currentJobId = Number(req.params.availableid);

    const duplicate = appliedDB.data.jobs.find((person) => (person.userId == currentUser && person.availableId == currentJobId));

    if (duplicate) {
        return res.json({
            message: "Job already applied"
        })
    }

    const currentJob = jobsDB.jobs.find((person) => person.availableId == currentJobId);

    const appliedJob = {
        "userId": currentUser.toString(),
        "availableId": currentJob.availableId,
        "title": currentJob.title,
        "company": currentJob.company,
        "location": currentJob.location,
        "skills": currentJob.skills,
        "salary": currentJob.salary,
        "postedAt": currentJob.postedAt
    }

    appliedDB.data.jobs.push(appliedJob);

    await fsPromises.writeFile(path.join(__dirname, "..", "model", "appliedJobs.json"), JSON.stringify(appliedDB.data, null, 2));

    res.json({
        message: "Applied Successfully"
    })



})

module.exports = { handleApplication };