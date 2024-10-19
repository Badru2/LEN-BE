const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Subject = sequelize.define(
  "subjects",
  {
    lesson_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true, // created_at, updated_at
    paranoid: true, // Soft delete (deleted_at)
  }
);

module.exports = Subject;
