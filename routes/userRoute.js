const express=require("express");
const router= express.Router();
const {login,register,profileView, profileUpdate}= require("../controllers/userController");

router.post("/login",login);
router.post("/register",register);
router.get("/profileview",profileView);
router.post("/profileupdate",profileUpdate);


module.exports= router;