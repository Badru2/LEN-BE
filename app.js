const sequelize = require("./config/database");

const express = require("express");
const bodyParse = require("body-parser");

const Post = require("./models/Post");
const Lesson = require("./models/Lesson");
const Subject = require("./models/Subject");

const postRoutes = require("./routers/PostRoutes");
const lessonRoutes = require("./routers/LessonRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParse.json());

const port = 8080;

app.use("/api/posts", postRoutes);
app.use("/api/lessons", lessonRoutes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
