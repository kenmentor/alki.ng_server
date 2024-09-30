/** @format */

const express = require("express");
const router = express.Router();
const { posts } = require("../models");
const { Op, literal } = require("sequelize");

router.get("/get_posted_recently", async (req, res) => {
  let { state, type, title, limit, id } = req.query;

  // If title is provided, get the most recent posts based on ID
  if (title) {
    // Early return to prevent sending multiple responses
    let recent_job = await posts.findAll({
      limit: parseInt(limit), // Default limit of 3
      attributes: ["thumbnail", "title", "type", "contact_num", "price", "id"],
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${title || ""}%` } }, // Use empty string if title is undefined
          { state: { [Op.like]: `%${state || ""}%` } }, // Use empty string if state is undefined
          !{ id: { [Op.eq]: id || 1 } },
        ],
      },
      order: literal("RAND()"),
    });

    console.log("Searching by state, type, or title");
    return res.json(recent_job);
  }

  // If title is not provided, search by state, type, or title (if defined)

  let total = await posts.count();
  let recent_job = await posts.findAll({
    limit: parseInt(limit), // Ensure limit is an integer
    where: {
      id: { [Op.gt]: total - 50 }, // Fetch the most recent 50 records
    },
  });
  console.log("Title search:", title);
  return res.json(recent_job);
});

module.exports = router;
