const express = require('express');
const multer = require('multer'); // For handling file uploads
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();

dotenv.config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Sequelize MySQL Configuration
const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define the Image Model
const Image = sequelize.define('Image', {
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: true
});

// Test DB Connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Multer setup for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Image Upload API Route
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        // Save image URL to MySQL
        Image.create({ imageUrl: result.secure_url })
          .then(() => res.status(200).json({ message: 'Image uploaded successfully', url: result.secure_url }))
          .catch(err => res.status(500).json({ error: 'Database Error' }));
      } else {
        res.status(500).json({ error: error });
    }
  });

    req.file.stream.pipe(result);
  } catch (error) {
    res.status(500).json({ error: 'Image upload failed' });
  }
});

// Start Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





app.post('/upload', upload.single('image'), (req, res) => {
  cloudinary.uploader.upload(req.file.path, (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Image upload failed' });
    }
    res.status(200).json({ message: 'Image uploaded successfully', url: result.secure_url });
  });
});
///////
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Image = require('../models/image.model');

const router = express.Router();

// Multer storage configuration (in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to handle image upload and additional data
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;  // Get text data from the request
    const file = req.file;

    if (!file || !title) {
      return res.status(400).json({ error: 'Title and image are required' });
    }

    // Upload file to Cloudinary
    cloudinary.uploader.upload_stream((error, result) => {
      if (error) {
        return res.status(500).json({ error: 'Cloudinary upload error' });
      }

      // Save image URL, title, and description to the database
      Image.create({
        imageUrl: result.secure_url,
        title: title,
        description: description || null  // Description is optional
      })
      .then(() => {
        res.status(200).json({
          message: 'Image and data uploaded successfully',
          imageUrl: result.secure_url
        });
      })
      .catch(err => res.status(500).json({ error: 'Database error', details: err.message }));

    }).end(file.buffer);  // Use the file buffer from multer
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
