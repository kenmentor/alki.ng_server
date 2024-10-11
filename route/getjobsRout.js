/** @format */

const express = require("express");
const router = express.Router();
const Post = require("../models/Post"); // Assuming Post is the Mongoose model

// Get jobs endpoint
router.get("/get_jobs", async (req, res) => {
  let searchQuery = req.query.search; // Search query from request
  
  try {
    // If no search query is provided, return the latest 51 posts
    if (!searchQuery) {
      const listOfPost = await Post.find({})
        .sort({ updatedAt: -1 }) // Sort by updatedAt in descending order
        .limit(51) // Limit the result to 51 posts
        .select("thumbnail LGA price description _id state title contact_num type"); // Select specific fields

      const totalJob = 10 // await Post.countDocuments(); // Get total number of posts
      return res.json({ data: listOfPost,totalJob });
    }

    // If search query is provided, perform a case-insensitive search
    if (searchQuery) {
      const searchPattern = new RegExp(searchQuery, "i"); // Case-insensitive search pattern

      const match = await Post.find({
        $or: [
          { title: { $regex: searchPattern } },
          { country: { $regex: searchPattern } },
          { price: { $regex: searchPattern } },
          { LGA: { $regex: searchPattern } },
          { state: { $regex: searchPattern } },
          { description: { $regex: searchPattern } }, // Full-text search alternative using regex
        ],
      }).sort({ updatedAt: -1 }); // Sort by updatedAt in descending order

      const totalJob = 12 //await Post.countDocuments(); // Get total number of posts
      return res.json({
        data: match,
        totalJob,
        search_message: searchQuery,
      });
    }
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error occurred" });
  }

  console.log(req.query.search); // Log the search query for debugging
});

module.exports = router;
