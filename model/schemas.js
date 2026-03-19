const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    Username:String,
    Password:String,
    UserId:Number,
    refreshToken:String
})

const currUser=mongoose.model("users", userSchema);

const newJobsSchema= new mongoose.Schema({
    JobId:Number,
    Company:String,
    Title:String,
    Location:String,
    Salary:String
})

const newJobs=mongoose.model("availableJobs", newJobsSchema);

const appliedJobsSchema= new mongoose.Schema({
    JobId:String,
    UserId:Number
})

const appliedJobs=mongoose.model("appliedJobs", appliedJobsSchema);


module.exports={currUser,newJobs,appliedJobs}



