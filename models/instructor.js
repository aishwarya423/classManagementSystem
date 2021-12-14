const mongoose = require("mongoose");

var instructorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 4,
        // unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      token:{type:String,default:"NA"},
    specification: { type: String },
    classes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Class",
          default:[]
        },
    ],
  },
  { timestamps: true }
);

var Instructor = mongoose.model("Instructor", instructorSchema);

exports.Instructor = Instructor;
