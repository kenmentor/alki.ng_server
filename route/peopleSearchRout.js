/** @format */

const express = require("express");
const router = express.Router();
const Post = require("../models/Post"); // Import the Mongoose Post model

// Route to handle people search
router.get("/peopleSearch", async (req, res) => {
  try {
    // Query to find the latest 7 posts and select 'title' and 'id' fields
    let response = await Post.find({})
      .sort({ updatedAt: -1 }) // Sort by updatedAt in descending order
      .limit(7) // Limit the result to 7 documents
      .select("title _id"); // Select only 'title' and '_id' fields

    res.json(response); // Send the response as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error occurred" }); // Error handling
  }
});

module.exports = router;
