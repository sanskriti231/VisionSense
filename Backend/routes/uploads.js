const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post('/', upload.single('image'), (req, res) => {
    console.log("REQ FILE:", req.file);
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }

  res.json({
    message: 'Image uploaded successfully',
    file: {
      originalName: req.file.originalname,
      fileName: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    },
  });
});

module.exports = router;
