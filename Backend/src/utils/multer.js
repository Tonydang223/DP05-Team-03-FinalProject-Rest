const multer = require('multer');

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// validate images file
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb({ message: 'Unsupported these files' }, false);
  }
};

const upload = multer({
  storage: storage,
  // limits: {fileSize:1024*1024},
  fileFilter: fileFilter,
});

module.exports = upload;
