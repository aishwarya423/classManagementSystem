const express = require("express");
const router = express.Router();
const {
    addClass,getClasses,getClass,editClass,deleteClass
} = require("../controllers/classController");
const {  checkAuth, studentAuth,instructorAuth } = require("../middleware/auth");


//c
router.post("/create-class", instructorAuth, addClass);
//r
router.get("/classes",checkAuth,getClasses);
router.get("/class-details/:id", checkAuth, getClass );
router.post("/edit", instructorAuth, editClass );
router.delete("/:id", instructorAuth,deleteClass );


module.exports = router;
