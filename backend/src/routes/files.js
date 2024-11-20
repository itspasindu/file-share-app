const express = require('express');
const multer = require('multer');
const File = require('../models/File');
const { ensureAuthenticated } = require('../utils/auth');

const router = express.Router();

// File Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({
  storage,
  limits: { fileSize: 16 * 1024 * 1024 }, // 16MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Invalid file type'));
  },
});

// Routes
router.post('/upload', ensureAuthenticated, upload.single('file'), async (req, res) => {
  const file = new File({ filename: req.file.filename, uploadedBy: req.user.id });
  await file.save();
  res.json({ message: 'File uploaded successfully', file });
});

router.get('/', ensureAuthenticated, async (req, res) => {
  const files = await File.find({ uploadedBy: req.user.id });
  res.json(files);
});

module.exports = router;
