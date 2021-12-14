// /api/auth/'route'
const express = require("express");
const router = express.Router();
const { userauth, checkauth, customerauth } = require("../middleware/auth");
const {
    signup,//based on role create user
    signin,//based on gmail login user
    logout
} = require("../controllers/authController");

// router.get("/login", checkauth);
 
// router.post("/signup", getUser);
  
// router.get("/logout", userauth, logoutUser);


router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", userauth, logout);

module.exports = router;
