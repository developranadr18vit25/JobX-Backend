const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name:String,
    Username: String,
    Password: String,
    UserId: Number,
    Roles:[String],
    refreshToken: String
})

const currUser = mongoose.model("users", userSchema);
userSchema.index({Username:1 , Password:1});


const newJobsSchema = new mongoose.Schema({
    JobId: Number,
    Company: String,
    Title: String,
    Location: String,
    Salary: Number,
    JobType: String,
    Experience: Number,
    Skills:[String],
    Description:String,
    Status:String
})

const newJobs = mongoose.model("availableJobs", newJobsSchema, "availableJobs");
newJobsSchema.index({Location:1 , JobType:1})

const appliedJobsSchema = new mongoose.Schema({
    JobId: Number,
    UserId: Number,
    Email:String,
    ResumeLink:String,
    Message:String,
    Status:String,
    AppliedOn:String
})

const appliedJobs = mongoose.model("appliedJobs", appliedJobsSchema, "appliedJobs");

const userProfileSchema = new mongoose.Schema({
    UserId:Number,
    Name: String,
    Age: Number,
    Qualification: [
        {
            Graduation: String,
            Postgraduation: String
        }

    ],
    Skills: [String],
    Experience: Number
})

const userProfile = mongoose.model("userProfile", userProfileSchema, "userProfile");
userProfileSchema.index({Name:"text", Skills:"text" });


module.exports = { currUser, newJobs, appliedJobs, userProfile }



