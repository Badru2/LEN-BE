const express = require("express");
const router = express.Router();
const { getSubjects, createSubject, updateSubject, deleteSubject } = require("../controllers/SubjectController");

router.get("/get", getSubjects);
router.post("/create", createSubject);
router.put("/update/:id", updateSubject);
router.delete("/delete/:id", deleteSubject);

module.exports = router;
