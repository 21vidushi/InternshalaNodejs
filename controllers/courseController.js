const User= require("../models/userModel");
const Course= require("../models/courseModel");
const jwt= require("jsonwebtoken");
const {mailSender}= require("../utils/nodemailer");
require("dotenv").config();
module.exports.getAllCourses=async(req,res)=>{
    try{
     const token=  req.cookies.token;
    //  const cat= req.params.cat;
     const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
     if(!token){
        return res.status(400).json({
            success:false,
            message:"User not logged in"
           });
     }
     console.log(token);
     console.log("token");
     
        const  courses= await Course.find().skip(startIndex).limit(limit)

    
     return res.status(200).json({
        success:true,
        message:"Course fetched successfully",
        courses
     });
     
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"there is some error in Course fetching"
           });
    }
}
module.exports.getAllCoursesbyLevel=async(req,res)=>{
    try{
     const token=  req.cookies.token;
     const lev= req.params.lev;
     const page = parseInt(req.query.page) || 1;
     const limit = parseInt(req.query.limit) || 10;
     const startIndex = (page - 1) * limit;
     if(!token){
        return res.status(400).json({
            success:false,
            message:"User not logged in"
           });
     }
     console.log(token);
     console.log("token");
     console.log(cat);
     let courses=[];
     if(cat){
        courses= await Course.find({level:lev}).skip(startIndex).limit(limit);
     }
     else{
         courses= await Course.find().skip(startIndex).limit(limit);
    }
    
     return res.status(200).json({
        success:true,
        message:"Course fetched successfully",
        courses
     });
     
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"there is some error in Course fetching"
           });
    }
}








module.exports.getAllEnrolledCourses=async(req,res)=>{
    try{
     const token=  req.cookies.token;
     if(!token){
        return res.status(400).json({
            success:false,
            message:"User not logged in"
           });
     }
     console.log(token);
     console.log("token");
     const data = jwt.verify(token, process.env.JWT_SECRET);
     console.log(data);
     const userid= data.id;
     console.log(data.id);
     const user= await User.findOne({_id:userid});
     console.log(user.courseEnrolled);
     const ids= user.courseEnrolled;
     return res.status(200).json({
        success:true,
        message:"Course fetched successfully",
        ids
     });
     
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"there is some error in Course fetching"
           });
    }
}

module.exports.createCourse=async(req,res)=>{
    try{
     const token=  req.cookies.token;
     const {name,category,level}=req.body;
     if(!token){
        return res.status(400).json({
            success:false,
            message:"User not logged in"
           });
     }
     console.log(token);
     console.log("token");
     const data= jwt.verify(token,process.env.JWT_SECRET);
     const auth= data.category;
     if(auth==="admin"){
       await Course.create({name,category,level});
     }
     else{
        return res.status(500).json({
            success:false,
            message:"You are not allowed to do this"
           });
     }
    
     return res.status(200).json({
        success:true,
        message:"Course created successfully",
     });
     
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"there is some error in Course creating"
           });
    }
}
module.exports.updateCourse=async(req,res)=>{
    try{
     const token=  req.cookies.token;
     const {name,category,level}=req.body;
     const id= req.params.courseid;
     console.log(id);
     if(!token){
        return res.status(400).json({
            success:false,
            message:"User not logged in"
           });
     }
     console.log(token);
     console.log("token");
     const data= jwt.verify(token,process.env.JWT_SECRET);
     const auth= data.category;
     console.log("token");
     if(auth==="admin"){
        console.log("Course updated");
         
       const det=await Course.findByIdAndUpdate({_id:id},{name,category,level});
       console.log("Course updated");
       return res.status(200).json({
        success:true,
        message:"Course updated successfully",
        det
       }
       );
     }
    
        return res.status(500).json({
            success:false,
            message:"You are not allowed to do this"
           });
     
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"there is some error in Course Updating"
           });
    }
}


module.exports.deleteCourse=async(req,res)=>{
    try{
     const token=  req.cookies.token;
     const id= req.params.courseid;
     if(!token){
        return res.status(400).json({
            success:false,
            message:"User not logged in"
           });
     }
     console.log(token);
     console.log("token");
     const data= jwt.verify(token,process.env.JWT_SECRET);
     const auth= data.category;
     if(auth==="admin"){
       await Course.findByIdAndDelete({_id:id});
     }
     else{
        return res.status(500).json({
            success:false,
            message:"You are not allowed to do this"
           });
     }
    
     return res.status(200).json({
        success:true,
        message:"Course Deleted successfully",
     });
     
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"there is some error in Course Updating"
           });
    }
}


module.exports.userEnrolled=async(req,res)=>{
    try{
     const token=  req.cookies.token;
     const courseid= req.params.courseid;
     console.log(courseid);
     if(!token){
        return res.status(400).json({
            success:false,
            message:"User not logged in"
           });
     }
     console.log(token);
     console.log("token");
     const data = jwt.verify(token, process.env.JWT_SECRET);console.log("token");

     console.log(data);
     const userid= data.id;
     console.log(data.id);
     const user=  await User.findOne({_id:userid});
     const email= user.email;
     console.log(user);
     const ids=user.courseEnrolled;
     console.log(ids);
     const index = ids.indexOf(courseid);
     console.log(index);
     if(index!=-1){
        return res.status(400).json({
            success:false,
            message:"User already enrolled in this course"
           });
     }
     console.log(user);
     console.log(user.courseEnrolled);
      user.courseEnrolled.push(courseid);
      console.log(user.courseEnrolled);
       user.save();
      
     const courseD= await Course.findById({_id:courseid});
     console.log(courseD);
     
     courseD.userEnrolled.push(userid);
     console.log(courseD.userEnrolled);
     courseD.save();
    mailSender(email,"Course enrollment successful");

     return res.status(200).json({
        success:true,
        message:"Course enrolled successfully",
        user,
        courseD
     });
     
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"there is some error in Course Enrollment"
           });
    }
}