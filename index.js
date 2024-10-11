const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const multer = require("multer");
require("dotenv").config(); // For environment variables

// Multer configuration for file uploads (if needed)
const upload = multer({ dest: "uploads/" });
app.use(cors());
app.use(express.json());
app.use(express.static("uploads")); // Serve static files

// Routes
const postRout = require("./route/createRout");
const recentlyPosted = require("./route/recentlyPosted");
const getjobsRout = require("./route/getjobsRout");
const peoplesearch = require("./route/peopleSearchRout");
const jobDetail = require("./route/jobDetail");

app.use("/alki", postRout);
app.use("/alki", recentlyPosted);
app.use("/alki", getjobsRout);
app.use("/alki", peoplesearch);
app.use("/alki", jobDetail);
// MongoDB connection
 const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_DB_URL || "mongodb://localhost:27017/alki_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully");
   
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

// Middleware


// Port and server setup
