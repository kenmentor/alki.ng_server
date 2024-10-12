/** @format */

const express = require("express");
const router = express.Router();
const Post = require("../models/Post"); // Assuming you've set up the Post model for Mongoose
const mongoose = require("mongoose")
router.get("/get_posted_recently", async (req, res) => {
  let { state, type, title, limit, id } = req.query;
  console.log(id);
  try {
    // If title is provided, get the most recent posts based on title, state, or type
    if (title&&id) {
      if (id && !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
      // Using Mongoose's `find` and `regex` to search for posts
      let recent_jobs = await Post.find({
        $or: [
          { title: { $regex: title || "", $options: "i" } }, // Case-insensitive regex for title
          { state: { $regex: state || "", $options: "i" } }, // Case-insensitive regex for state
          { _id: { $ne: new mongoose.Types.ObjectId(id) } }, // Exclude the post with the specified id
        ],
      })
        .limit(parseInt(limit) || 3) // Limit results, default to 3
        .select("thumbnail title type contact_num price _id"); // Select specific fields

      console.log("Searching by state, type, or title");
      return res.json(recent_jobs);
    }

    // If title is not provided, return the most recent posts
    let recent_jobs = await Post.find({})
      .limit(parseInt(limit) || 10) // Default limit to 10 if not provided
      .select("thumbnail title type contact_num price _id");

    console.log("Title search:", title);
    return res.json(recent_jobs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving posts", error });
  }
});

module.exports = router;
