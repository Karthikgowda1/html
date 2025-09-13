const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Ensure uploads folder exists
if (!fs.existsSync('uploads')){
  fs.mkdirSync('uploads');
}

// Storage config for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Serve static files
app.use(express.static(__dirname));

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    res.send('File uploaded successfully: ' + req.file.filename);
  } else {
    res.status(400).send('Upload failed');
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
