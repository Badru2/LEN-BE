const express = require("express");
const sequelize = require("./config/database");

const app = express();
const port = 3000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
