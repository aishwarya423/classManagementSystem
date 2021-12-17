const mongoose = require("mongoose");

var classSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: { type: String },
    category: { type: String },
    hours: { type: String },
    startsAt: { type: String },
    endsAt: { type: String },
    instructor:  {  
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Instructor",
        required:true
    },
    studentsRegistered: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          default:[]
        },
      ]
  },
  { timestamps: true }
);

var Class = mongoose.model("Class", classSchema);

exports.Class = Class;
