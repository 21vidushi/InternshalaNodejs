const express = require("express");
const app= express();
const userRoute= require("./routes/userRoute");
const courseRoute= require("./routes/courseRoute.js");
const dbconnect= require("./database.js");
const cookieParser = require("cookie-parser");
const fileupload=require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
const cloudinary=require("./utils/upload.js");
cloudinary.Cloudinaryconnect();
dbconnect.dbconnect;
require("dotenv").config();
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user",userRoute);
app.use("/api/v1/course",courseRoute);
app.get("/",(req,res)=>{
    res.send("Hello world");
});
app.listen(process.env.PORT,()=>{
    console.log("Sever started");
});
