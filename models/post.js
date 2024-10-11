/** @format */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      default: "jujgugugugug",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    contact_num: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    LGA: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    lon: {
      type: String,
      default: "3333333",
    },
    lat: {
      type: String,
      default: "3333333",
    },
    type: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      default: "mentor",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", userSchema);
module.exports = Post;
