const express = require("express");
const router = express.Router();
const {
    addClass,getClasses,getClass,editClass,deleteClass
} = require("../controllers/classController");

//c
router.post("/create-class",addClass);
//r
router.get("/classes", getClasses);
router.get("/class/:id",getClass );
router.post("/edit",editClass );
router.post("/delete/:id",deleteClass );


module.exports = router;
