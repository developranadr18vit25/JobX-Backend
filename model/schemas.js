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

const newJobsSchema = new mongoose.Schema({
    JobId: Number,
    Company: String,
    Title: String,
    Location: String,
    Salary: Number,
    JobType: String,
    Experience: Number,
    Status:String
})

const newJobs = mongoose.model("availableJobs", newJobsSchema, "availableJobs");

const appliedJobsSchema = new mongoose.Schema({
    JobId: Number,
    UserId: Number,
    Status:String
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



