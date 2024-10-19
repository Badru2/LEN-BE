const upload = require("../config/multer");
const Subject = require("../models/Subject");

const getSubjects = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const subjects = await Subject.findAndCountAll({ limit, offset });
    const totalPages = Math.ceil(subjects.count / limit);

    res.status(200).json({
      data: subjects.rows,
      total: subjects.count,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSubject = [
  upload("subjects").single("file"),
  async (req, res) => {
    const { lesson_id, name, content } = req.body;

    const { filename } = req.file;
    const file = filename;

    try {
      const newSubject = await Subject.create({
        lesson_id,
        name,
        content,
        file,
      });

      res.status(201).json(newSubject);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

const updateSubject = [
  upload("subjects").single("file"),
  async (req, res) => {
    const { id } = req.params;
    const { name, content, file } = req.body;

    try {
      const updatedSubject = await Subject.update({ name, content, file }, { where: { id } });

      res.status(200).json({ message: "Subject updated successfully", updatedSubject });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

const deleteSubject = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSubject = await Subject.destroy({ where: { id } });

    res.status(200).json({ message: "Subject deleted successfully", deletedSubject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
};
