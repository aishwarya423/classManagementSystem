// /api/auth/'route'
const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middleware/auth");
const {
    signup,
    signin,
    logout 
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", checkAuth, logout);

module.exports = router;
