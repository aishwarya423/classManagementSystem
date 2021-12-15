require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Instructor } = require('../models/instructor')
const { Student } = require('../models/student')



exports.instructorAuth = async (req, res, next) => {
  console.log("reqqqq",req.headers.authorization) 
let token = req.headers.authorization.split(' ')
token = token[1]
console.log(token,"tokkkkkkkkken")
  try {
    if (!token) {
      return res.status(409).send("access denied. No token Provided");
    }else {    
      const decoded = jwt.verify(token, process.env.jwtPrivateKey);
      var user = await Instructor.findOne({ _id: decoded._id });
      if(user ==null) return res.status(400).send('Unauthorised access')
      req.user = user;   
      res.locals.currentUser = user; 
    console.log(req.user,"req.user");
    console.log(res.locals.currentUser,"currtusr");  }
    next();
  } catch (e) {
    console.log(e);
    res.clearCookie("token");
  }
};



exports.studentAuth = async (req, res, next) => {
  console.log("reqqqq",req.headers.authorization) 
let token = req.headers.authorization.split(' ')
token = token[1]
console.log(token,"tokkkkkkkkken")
  try {
    if (!token) {
      return res.status(409).send("access denied. No token Provided");
    }else {    
      const decoded = jwt.verify(token, process.env.jwtPrivateKey);
      var user = await Student.findOne({ _id: decoded._id });
      if(user == null) return res.status(400).send('Unauthorised access')

      req.user = user;
      res.locals.currentUser = user; 
    console.log(req.user,"req.user");
    console.log(res.locals.currentUser,"currtusr");  }
    next();
  } catch (e) {
    console.log(e);
    res.clearCookie("token");
  }
};


exports.checkAuth = async (req, res, next) => {
  console.log("reqqqq",req.headers.authorization) 
let token = req.headers.authorization.split(' ')
token = token[1]
console.log(token,"tokkkkkkkkken")
  try {
    if (!token) {
      return res.status(409).send("access denied. No token Provided");
    }else {
      const decoded = jwt.verify(token, process.env.jwtPrivateKey);
      //find role n proceed 
      var user = await Student.findOne({ token: token});
      if(user == null) {
      user = await Instructor.findOne({ token: token });
      }
      if(user == null) return res.status(400).send('Unauthorised access')
      req.user = user;
      res.locals.currentUser = user; 
    console.log(req.user,"req.user");
    console.log(res.locals.currentUser,"currtusr");  }
    next();
  } catch (e) {
    console.log(e);
    res.clearCookie("token");
  }
};








