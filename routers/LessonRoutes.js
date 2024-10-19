const express = require("express");
const { getLessons, createLessons, updateLessons, deleteLessons } = require("../controllers/LessonController");

const router = express.Router();

router.get("/get", getLessons);
router.post("/create", createLessons);
router.put("/update/:id", updateLessons);
router.delete("/delete/:id", deleteLessons);

module.exports = router;
