/** @format */
const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const dotenv = require("dotenv");
const Post = require("../models/Post"); // MongoDB Post model using Mongoose
dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 90000,
});

// Set up multer storage in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper function to upload file buffer to Cloudinary
const uploadFromBuffer = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

// Route to post jobs
router.post("/post_jobs", upload.single("file"), async (req, res) => {
  const {
    title,
    description,
    contact_num,
    price,
    state,
    LGA,
    country,
    professional_job,
    casual_job,
    remote_job,
    type,
    lat,
    lon,
  } = req.body;

  const file = req.file;

  try {
    let imageUrl = null; // Default image URL to null

    // If a file is provided, upload it to Cloudinary
    if (file) {
      const result = await uploadFromBuffer(file.buffer);
      imageUrl = result.secure_url;
    }

    // Create the post in MongoDB using Mongoose
    const newPost = new Post({
      thumbnail: imageUrl,
      title,
      description,
      contact_num,
      price,
      state,
      LGA,
      country,
      lat,
      lon,
      professional_job,
      casual_job,
      remote_job,
      type,
    });

    await newPost.save(); // Save the post to the database

    // Send response back
    res.json({
      message: file
        ? "Post and image uploaded successfully"
        : "Post created successfully, no image uploaded",
      post: newPost,
      imageUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", error });
  }
});

module.exports = router;
