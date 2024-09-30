/** @format */

const express = require("express");
const app = express();
const db = require("./models");
const cors = require("cors");
const multer = require("multer");

////////////multer configurstion
/// router
const postRout = require("./route/createRout");
const recentlyPosted = require("./route/recentlyPosted");
const getjobsRout = require("./route/getjobsRout");
const peoplesearch = require("./route/peopleSearchRout");
const jobDetail = require("./route/jobDetail");
const { json } = require("sequelize");
app.use(cors());
app.use(express.json());
app.use("/alki", postRout);
app.use("/alki", recentlyPosted);
app.use("/alki", getjobsRout);
app.use("/alki", peoplesearch);
app.use("/alki", jobDetail);
app.use(express.static("uploads"));

db.sequelize.sync().then(() => {
  console.log("syn sucessful");
  app.listen(3001, "0.0.0.0", () => {
    console.log("server listeening at 3001");
  });
});
