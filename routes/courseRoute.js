const express=require("express");
const { getAllEnrolledCourses, getAllCourses, getAllCoursesbyLevel, createCourse, updateCourse,deleteCourse, userEnrolled } = require("../controllers/courseController");
const router= express.Router();

 router.get("/getallenrolled",getAllEnrolledCourses);
 router.get("/getallcourses",getAllCourses);
 router.get("/getallcourses/level/:lev",getAllCoursesbyLevel);
 router.post("/createcourse",createCourse);
 router.post("/updatecourse/:courseid",updateCourse);
 router.post("/deletecourse/:courseid",deleteCourse);
 router.post("/userenrolled/:courseid",userEnrolled);




module.exports= router;