const multer = require('multer');
const { Error } = require('../utils');

const maxSize = 1 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'application/json') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .json and .csv format allowed!', 400));
    }
  },
  limits: {
    fileSize: maxSize,
  },
  onError: (err, next) => {
    logger.info('file upload error', err);
    next(err);
  },
});

module.exports =  upload;