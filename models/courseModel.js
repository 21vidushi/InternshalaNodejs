const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
     name: {
    type: String,
    required: true,
  },
    category: {
    type: String,
    required:true
  },
    userEnrolled:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
   level:{
    type:"String",
    enum:["beginner","intermediate","advance"]
    
  }
});

module.exports = mongoose.model("Course", courseSchema);
