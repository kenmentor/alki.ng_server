const express = require("express");
const router = express.Router();
const { posts,sequelize} = require("../models");
router.get("/peopleSearch", async (req, res) => {
 
    let response = await posts.findAll({
      limit:7,
      order: [["updatedAt", "DESC"]],
      attributes:['title','id']
      
});
    res.json(response);
  });
  module.exports = router