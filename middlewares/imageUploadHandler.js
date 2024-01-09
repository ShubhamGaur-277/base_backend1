const multer = require('multer');

// Set up Multer for handling file uploads
const upload = multer();

const imageUploadMiddleware = (req, res, next) => {
  return new Promise((resolve, reject) => {
    upload.single('profileImage')(req, res, function (err) {
      if (err) {
        reject('Error uploading image');
      }

      // Access the uploaded image in req.file
      const profileImageBuffer = req.file ? req.file.buffer : null;

      resolve(profileImageBuffer);
    });
  });
};

module.exports = imageUploadMiddleware;
