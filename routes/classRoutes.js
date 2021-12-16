const express = require("express");
const router = express.Router();
const {
    addClass,getClasses,getClass,editClass,deleteClass ,getMyClasses
} = require("../controllers/classController");
const {  checkAuth, studentAuth,instructorAuth } = require("../middleware/auth");

router.post("/create-class", instructorAuth, addClass);
router.get("/classes",checkAuth,getClasses);//check if instructor or student and then give his classes
router.get("/class-details/:id", checkAuth, getClass);
router.get("/my-classes", checkAuth, getMyClasses);

router.post("/edit", instructorAuth, editClass );
router.delete("/:id", instructorAuth,deleteClass );


module.exports = router;
