const mongoose = require("mongoose");

var classSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    description: { type: String },
    category: { type: String },
    hours: { type: String },
    startsAt: { type: String },
    endsAt: { type: String },
    instructor:  {  
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Instructor",
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
