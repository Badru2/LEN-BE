const upload = require("../config/multer");
const Post = require("../models/Post");

const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const posts = await Post.findAndCountAll({ limit, offset });
    const totalPages = Math.ceil(posts.count / limit);

    res.status(200).json({
      data: posts.rows,
      total: posts.count,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPosts = [
  upload("posts").single("thumbnail"),
  async (req, res) => {
    try {
      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required." });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Thumbnail image is required." });
      }

      const { filename } = req.file;
      const newPost = await Post.create({ title, content, thumbnail: filename });

      res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// update post using multer
const updatePost = [
  upload("posts").single("thumbnail"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required." });
      }

      const post = await Post.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found." });
      }

      if (req.file) {
        const { filename } = req.file;
        post.thumbnail = filename;
      }

      post.title = title;
      post.content = content;
      await post.save();

      res.status(200).json({ message: "Post updated successfully", post });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// delete post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }
    await post.destroy();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export using module.exports
module.exports = {
  getPosts,
  createPosts,
  updatePost,
  deletePost,
};
