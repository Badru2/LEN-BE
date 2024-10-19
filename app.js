const express = require("express");
const sequelize = require("./config/database");

const Post = require("./models/Post");
const Lesson = require("./models/Lesson");
const Subject = require("./models/Subject");

const postRoutes = require("./routers/PostRoutes");

const app = express();
const port = 8080;

app.use("/api/posts", postRoutes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
