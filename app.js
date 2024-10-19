const sequelize = require("./config/database");

const express = require("express");
const bodyParse = require("body-parser");

const Post = require("./models/Post");
const Lesson = require("./models/Lesson");
const Subject = require("./models/Subject");

const postRoutes = require("./routers/PostRoutes");
const lessonRoutes = require("./routers/LessonRoutes");
const subjectRoutes = require("./routers/SubjectRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParse.json());

const port = 8080;

Lesson.hasMany(Subject, { foreignKey: "lesson_id" });

Subject.belongsTo(Lesson, { foreignKey: "lesson_id" });

app.use("/api/posts", postRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/subjects", subjectRoutes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
