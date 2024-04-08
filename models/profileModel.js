const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    DOB:{
    type: String,
    
  },
   PhoneNumber:{
    type:String
   },
   Aboutme:{
    type:String
   },
   profilepic:{
    type:String
   }
});

module.exports = mongoose.model("Profile", profileSchema);
