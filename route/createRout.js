/** @format */
const express = require("express");
const router = express.Router();
const { posts } = require("../models");
const { where, Op, literal } = require("sequelize");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  timeout: 90000,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

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
    if (file) {
      // Upload the file to Cloudinary
      const uploadFromBuffer = (fileBuffer) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(fileBuffer).pipe(uploadStream);
        });
      };

      const result = await uploadFromBuffer(file.buffer); // Await the upload result
      const imageUrl = result.secure_url;

      // Create the post with the uploaded image URL
      await posts.create({
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

      res.json({ message: "Post and image uploaded successfully", imageUrl });
    } else {
      // No file uploaded, create the post without an image
      await posts.create({
        thumbnail: null,
        title,
        description,
        contact_num,
        price,
        state,
        LGA,
        country,
        lat,
        lon,
        type,
      });

      res.json({
        message: "Post created successfully, but no image was uploaded",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "An error occurred", error: e });
  }
});

module.exports = router;
