require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Instructor } = require('../models/instructor')
const { Student } = require('../models/student')



exports.instructorAuth = async (req, res, next) => {
//   console.log("reqqqq",req.headers.authorization) 
// let token = req.headers.authorization.split(' ')
// token = token[1]
let token =  req.cookies.token.token
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
// let token = req.headers.authorization.split(' ')
// token = token[1]
let token =  req.cookies.token.token
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
  try {
   let token =  req.cookies.token.token
   console.log(token,req.cookies)
    if (!token) {
      return res.status(409).send("access denied. No token Provided");
    }else {
      const decoded = jwt.verify(token, process.env.jwtPrivateKey);
      console.log(decoded)
      if(decoded.role=='student'){
        var user = await Student.findOne({ _id: decoded._id});
        req.user = user;
        res.locals.currentUser = user;
        console.log(req.user,user,"holaa")

        next();
      } else if(decoded.role =='instructor'){
        user = await Instructor.findOne({ _id: decoded._id });
        req.user = user;
        res.locals.currentUser = user;
        next();
      } else{
        return res.status(400).send('Unauthorised access')
      }
    }
  } catch (e) {
    console.log(e);
    // res.clearCookie("token");
    return res.status(400).send("access denied. No token Provided");
  }
};








