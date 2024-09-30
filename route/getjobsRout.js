/** @format */

const express = require("express");
const router = express.Router();
const { posts, sequelize } = require("../models");
const { where, Op, literal } = require("sequelize");

router.get("/get_jobs", async (req, res) => {
  let searchQuery = req.query.search;
  if (!searchQuery) {
    const listOfPost = await posts.findAll({
      limit: 51,
      order: [["updatedAt", "DESC"]],
      attributes: [
        "thumbnail",
        "LGA",
        "price",
        "description",
        "id",
        "state",
        "title",
        "contact_num",
        "type",
      ],
    });

    res.json({ data: listOfPost, totalJob: await posts.count() });
  }
  if (searchQuery) {
    const match = await posts.findAll({
      order: [["updatedAt", "DESC"]],
      where: {
        [Op.or]: [
          literal("LOWER(title) LIKE LOWER(:searchPattern)"),
          literal("LOWER(country) LIKE LOWER(:searchPattern)"),
          literal("LOWER(price) LIKE(:searchPattern)"),
          literal("LOWER(LGA) LIKE LOWER(:searchPattern)"), // Case-insensitive LIKE for 'author'
          literal("LOWER(state) LIKE LOWER(:searchPattern)"),
          literal(
            "MATCH(description) AGAINST(:searchQuery IN NATURAL LANGUAGE MODE)"
          ),
        ],
      },
      replacements: {
        searchQuery: searchQuery,
        searchPattern: `%${searchQuery}%`,
      },
    });

    res.json({
      data: match,
      totalJob: await posts.count(),
      search_message: searchQuery,
    });
  }

  console.log(req.query.search);
});
module.exports = router;
