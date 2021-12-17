const mongoose = require("mongoose");

var studentSchema = new mongoose.Schema(
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
    active:Boolean,
    role:String,
    token:{type:String,default:"NA"},
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

var Student = mongoose.model("Student", studentSchema);

exports.Student = Student;
