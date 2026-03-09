const express=require("express");
const app=express();

const path=require("path");
const connectDB=require("./model/connect.js");
const fs=require("fs");
require("dotenv").config();
const signUpRouter=require("./routes/signUp.js");
const loginRouter=require("./routes/Login.js");
const displayRouter=require("./routes/display.js");
const addRouter=require("./routes/add.js");
const updateRouter=require("./routes/update.js")
const searchRouter=require("./routes/search.js");
const adminViewRouter=require("./routes/adminView.js");
const findJobsRouter=require("./routes/findJobs.js");
const jobApplicationRouter=require("./routes/application.js");
const cookieParser=require("cookie-parser");
const refreshRouter=require("./routes/refresh.js");

app.use(express.json());
app.use(cookieParser());

connectDB();

app.get("/",(req,res)=>{
    res.send("express is working ")
})

app.use("/signUp", signUpRouter);
app.use("/login", loginRouter);
app.use("/display", displayRouter);
app.use("/add",addRouter);
app.use("/update",updateRouter);
app.use("/search", searchRouter);
app.use("/admin", adminViewRouter);
app.use("/new", findJobsRouter);
app.use("/application", jobApplicationRouter);
app.use("/refresh" , refreshRouter);


 
app.listen(4000,()=>{
    console.log("Running on port 4000");
})