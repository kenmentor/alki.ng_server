const express = require('express')
const { posts, bussAdd, sequelize } = require("../models");
const router = express.Router()
router.get("/jobdetail/:id", async (req, res) => {
    let id = req.params.id;
    let response = await posts.findByPk(id);
    res.json(response);
  });
  
  
  router.get("/get_bussAdd", async (req, res) => {
    let response = await bussAdd.findAll();
    res.json(response);
  });
  router.post("/post_bussAdd", async (req, res) => {
    let post = req.body;
    await bussAdd.create({
      thumbnail:'kkldld',
      name:'hello world',
      descriotion:'fkihfihfhfuh',
      image1:'helloe',
      image2:'helloe',
      image3:'helloe',
      state:'helloe',
      LGA:'helloe',
      username:'helloe',
    });
  });
  module.exports = router