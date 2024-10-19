const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const Lesson = sequelize.define(
  "lessons",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true, // created_at, updated_at
    paranoid: true, // Soft delete (deleted_at)
  }
);

module.exports = Lesson;
