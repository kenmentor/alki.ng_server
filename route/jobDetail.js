/** @format */

const express = require("express");
const router = express.Router();
const Post = require("../models/Post"); // Import Mongoose Post model
//const BussAdd = require("../models/BussAdd"); // Import Mongoose BussAdd model

// Route to get job details by id
router.get("/jobdetail/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let response = await Post.findById(id); // Find post by MongoDB _id
    if (!response) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(response); // Send job details as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error occurred" });
  }
});

/*// Route to get all business ads
router.get("/get_bussAdd", async (req, res) => {
  try {
    let response = await BussAdd.find(); // Fetch all business ads
    res.json(response); // Send as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error occurred" });
  }
});

 Route to post a new business ad
router.post("/post_bussAdd", async (req, res) => {
  try {
    let post = req.body; // Get request body
    const newBussAdd = new BussAdd({
      thumbnail: post.thumbnail || 'kkldld',  // Default value if not provided
      name: post.name || 'hello world',
      description: post.description || 'fkihfihfhfuh',
      image1: post.image1 || 'helloe',
      image2: post.image2 || 'helloe',
      image3: post.image3 || 'helloe',
      state: post.state || 'helloe',
      LGA: post.LGA || 'helloe',
      username: post.username || 'helloe',
    });

    await newBussAdd.save(); // Save to MongoDB
    res.status(201).json({ message: "Business ad created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create business ad" });
  }
});
*/
module.exports = router;
