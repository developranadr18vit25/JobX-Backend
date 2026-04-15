const express=require("express");
const app=express();

const cors = require("cors");

app.use(cors());

const path=require("path");
const connectDB=require("./model/connect.js");
const fs=require("fs");
require("dotenv").config();
const signUpRouter=require("./routes/signUp.js"); // done
const loginRouter=require("./routes/Login.js"); // done
const displayRouter=require("./routes/display.js");
const applyRouter=require("./routes/appliedJobs.js"); // done
const resetPwdRouter=require("./routes/resetPwd.js"); //done
const jobApplicationRouter=require("./routes/availableJobs.js"); //done
const cookieParser=require("cookie-parser");
const refreshRouter=require("./routes/refresh.js");
const changePersonalDataRouter=require("./routes/changePersonalData.js") //done
const userProfileRouter=require("./routes/userProfile.js");

app.use(express.json());
app.use(cookieParser());

connectDB();

app.get("/",(req,res)=>{
    res.send("express is working ")
})

app.use("/signUp", signUpRouter); // done
app.use("/login", loginRouter); //done
app.use("/display", displayRouter);
app.use("/apply",applyRouter);
app.use("/application", jobApplicationRouter); //done
app.use("/refresh" , refreshRouter);
app.use("/reset" , resetPwdRouter); //done
app.use("/account", changePersonalDataRouter); //done
app.use("/my" , userProfileRouter);



 
app.listen(4000,()=>{
    console.log("Running on port 4000");
})