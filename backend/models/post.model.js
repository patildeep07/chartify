const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  Day: {
    type: String,
    required: true,
  },

  Age: {
    type: String,
    required: true,
  },

  Gender: {
    type: String,
    required: true,
  },

  A: {
    type: String,
    required: true,
  },

  B: {
    type: String,
    required: true,
  },

  C: {
    type: String,
    required: true,
  },

  D: {
    type: String,
    required: true,
  },

  E: {
    type: String,
    required: true,
  },

  F: {
    type: String,
    required: true,
  },
});

const Post = new mongoose.model("Post", PostSchema);

module.exports = Post;
