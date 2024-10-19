const express = require("express");
const { getPosts, createPosts, updatePost, deletePost } = require("../controllers/PostController");
const router = express.Router();

router.get("/get", getPosts);
router.post("/create", createPosts);
router.put("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);

module.exports = router;
