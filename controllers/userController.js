const User= require("../models/userModel.js");
const Profile= require("../models/profileModel.js");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
const cloudinary =require("cloudinary").v2;
const {mailSender}= require("../utils/nodemailer");
require("dotenv").config();
module.exports.register=async(req,res)=>{
    try{
    const {name,email,password,confirmPassword,category}= req.body;
    if(!(email||name||password||confirmPassword||category)){
        return res.status(400).json({
            success:false,
            message:"All feilds are required"
        });
    }
    if(password!=confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password is not matched"
        });
    }
    console.log("email finding");
    const user= await User.findOne({email});
    if(user){
        return res.status(400).json({
            success:false,
            message:"User is already registered.Go and Login"
        });
    }
    console.log("profile creating");
    let profileDetails= await Profile.create({
        DOB:null,
        PhoneNumber:null,
        Aboutme:null,
        profilepic:null
    })
    console.log("hello");

    console.log(profileDetails);
    let courses=[];
    console.log("profile created");
    const hashPass=   await bcrypt.hash(password,10);
    console.log(hashPass);
    const newuser=await  User.create({name,email,category,password:hashPass,profile:profileDetails._id,courseEnrolled:courses});
    console.log("user created");
    mailSender(email,"Registration successful");
   
    return res.status(200).json({
        success:true,
        message:"User registered successfully",
        newuser
    });
    
}

catch(err){
   return res.status(500).json({
    success:false,
    message:"there is some error in regsitering"
   });
}
}

module.exports.login=async(req,res)=>{
    try{
        const {email,password}= req.body;
        if(!(email||password)){
            return res.status(400).json({
                success:false,
                message:"All feilds are required"
            });
        }
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User is not registered."
            });
        }
       if(!await bcrypt.compare(password,user.password)){
        return res.status(400).json({
            success:false,
            message:"password is not matched"
        });
       }
      const payload= {
         id:user._id,
         category:user.category
      }
      const token= jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"2h"
      });
      user.token=token;
      user.password=undefined;

     const options={
         expires: new Date(Date.now()+ 3*24*60*60*1000),
         httpOnly:true
     }
     return res.status(200).cookie("token",token,options).json({
        success:true,
        message:"User login up successful",
        token,
        user
     });
        
    }
    
    catch(err){
       return res.status(500).json({
        success:false,
        message:"there is some error in Login"
       });
    }
}

module.exports.profileView=async(req,res)=>{
    try{
        console.log("profile");
     const token1=  req.cookies.token;
     console.log(token1);
     console.log("verifying");
     if(!token1){
        return res.status(400).json({
            success:false,
            message:"User not logged in"
           });
     }
     console.log("verifying");
     const data = jwt.verify(token1, process.env.JWT_SECRET);

     console.log("data",data);
     const userid= data.id;
     console.log(userid);
     const user= await User.findOne({_id:userid});
     console.log(user);
     const profileD= await Profile.findById({_id:user.profile});
     console.log("profile Details are",profileD);
     return res.status(200).json({
        success:true,
        message:"User profile fetched successfully",
        profileD
    });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"there is some error in Profile viewing"
           });
    }
}

module.exports.profileUpdate=async(req,res)=>{
    try{
     const token=  req.cookies.token;
     const {DOB,PhoneNumber,Aboutme,profilepic}=req.body;
     const file=req.files.imageFile;
     const SupportedTypes =["jpg","jpeg","png"];
     const fileType= file.name.split('.')[1].toLowerCase();
     if(!token){
        return res.status(400).json({
            success:false,
            message:"User not logged in"
           });
     }
     console.log(token);
     console.log("token");
     if(!isFileTypeSupported(fileType,SupportedTypes)){
        return res.status(500).json({
                sucess:false,
                message:"Not supported file type"
        });
  }
     const data = jwt.verify(token, process.env.JWT_SECRET);
     console.log(data);
     const userid= data.id;
     console.log(data.id);
     const user= await User.findOne({_id:userid});
     console.log(user);
     console.log(user.profile);
     const response = await UploadTo(file,"VidushiMediaUpload");
     const url=response.secure_url;
     if(!(DOB||PhoneNumber||Aboutme)){
        return res.status(400).json({
            success:false,
            message:"All feilds are required"
        });
    }
    const pid= user.profile;
    console.log("checked");
       await Profile.findByIdAndUpdate({_id:pid},{
       DOB,PhoneNumber,profilepic:url,Aboutme,user:userid
     });
     console.log("User updated");
     return res.status(200).json({
        success:true,
        message:"User profile updated successfully",
        
    });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"there is some error in Profile update"
           });
    }
}