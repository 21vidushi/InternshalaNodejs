const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    min: 8,
  },
    category: {
    type: String,
    enum:["user","admin"]
  },
  courseEnrolled:
    [ {
    type:mongoose.Schema.Types.ObjectId,
    ref: "Course",
    }
    ],
  profile:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    
  },
  token:{
    type:"String"
  }
});

module.exports = mongoose.model("User", userSchema);
