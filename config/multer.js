const multer = require("multer");
const fs = require("fs");
const path = require("path");

const upload = (filePath) => multer({ storage: storage(filePath) });

const storage = (filePath) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = path.join(__dirname, "../public/" + filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true }); // Ensure directory exists
      }
      cb(null, dir);
    },
    // Generate filename without using date
    filename: function (req, file, cb) {
      const uniqueName = `${file.originalname}`;
      cb(null, uniqueName);
    },
  });

module.exports = upload;
