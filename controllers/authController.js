require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Instructor } = require("../models/instructor");
const { Student } = require("../models/student");

// async function generateAuthToken(res, _id, name, subject, cart, wishList) {
async function generateAuthToken(res, _id, name, email) {
  const expiration = 604800000;
  const token = jwt.sign(
    { _id: _id, name: name, email: email },
    process.env.jwtPrivateKey,
    {
      expiresIn: process.env.DB_ENV === "testing" ? "1d" : "7d",
    }
  );
  var obj = {
    token: token,
    name: name,
    _id: _id,
    email: email
  };
  res.cookie("token", obj, {
    expires: new Date(Date.now() + expiration),
    httpOnly: true,
    secure: true,
  });
  return token;
}
//for instructor or student logout
exports.logout = async (req, res) => {
    try {
      var user;
      user = await Student.findOne({ _id: req.user._id });
      if(!user || user == undefined){
       user = await Instructor.findOne({ _id: req.user._id });
      }
      user.active = false;
      user.phoneToken = "";
      user.save();
      res.clearCookie("token");
    return res.status(200).json({message:"Logged Out successfully"});
    } catch (err) {
      console.log(err);
    }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = null
    user = await Instructor.findOne({ email: email });
    if(!user || user === undefined ){
    user = await Student.findOne({ email: email });
    }
    if (user) {
      return res.status(400).json({message:"User already exists with this email id"});
    } else
    if(req.body.role === "instructor"){
      var newuser = await Instructor.create({
        name: name,
        email: email,
        password: password,
      });
    } else if(req.body.role === "student"){
      var newuser = await Student.create({
        name: name,
        email: email,
        password: password,
      });
    } else{
      return res.status(400).json({message:"Please pass all fields"})//check
    }
    await generateAuthToken(
      res,
      newuser._id,
      newuser.name,
      email
    );
    newuser.active = true;
    newuser.save();
    return res.status(200).json({message:`${req.body.role} ${req.body.name} created successfully`,data:newuser});
  } catch (err) {
    console.log(err);
    return res.status(500).json({message:`Error! try again later`});
  }
};

exports.signin = async (req, res) => { 
  const { name, email, password } = req.body;
  let user = null
  user = await Instructor.findOne({ email: email });
  if(!user || user === undefined ){
  user = await Student.findOne({ email: email });
  }
  if (!user || req.body.password != user.password) {
    return res.status(400).json({message:"Invalid Email/Password"});
  } 
  const token = generateAuthToken(
    res,
    user._id,
    user.name,
    email
  );
  console.log(token, res,
    user._id,
    user.name,
    email,"tokennn")
  user.token = token;
  user.active = true;
  user.save();
  return res.status(200).json({message:"Successfully logged in",data:user});
};
