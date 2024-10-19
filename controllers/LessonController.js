const Lesson = require("../models/Lesson");

const getLessons = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const lessons = await Lesson.findAndCountAll({ limit, offset });
    const totalPages = Math.ceil(lessons.count / limit);

    res.status(200).json({
      data: lessons.rows,
      total: lessons.count,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createLessons = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newLessons = await Lesson.create({ title, description });

    res.status(201).json({ message: "Lessons created successfully", lessons: newLessons });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLessons = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const lessons = await Lesson.findByPk(id);

    if (!lessons) {
      return res.status(404).json({ message: "Lessons not found." });
    }

    await lessons.update({ title, description });

    res.status(200).json({ message: "Lessons updated successfully", lessons });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLessons = async (req, res) => {
  const { id } = req.params;

  try {
    const lessons = await Lesson.findByPk(id);

    if (!lessons) {
      return res.status(404).json({ message: "Lessons not found." });
    }
    lessons.destroy();
    res.status(200).json({ message: "Lessons deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLessons, createLessons, updateLessons, deleteLessons };
