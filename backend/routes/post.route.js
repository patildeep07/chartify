const express = require("express");
const postRouter = express.Router();
const csvtojson = require("csvtojson");
const Post = require("../models/post.model");

const filePath = `${__dirname}/data.csv`;

// Create router
postRouter.post("/add", async (req, res) => {
  csvtojson()
    .fromFile(filePath)
    .then((csvData) => {
      console.log(csvData);
      Post.insertMany(csvData)
        .then(function () {
          console.log("Data inserted!");
          res.json({ message: "success" });
        })
        .catch(function (error) {
          console.log(error);
        });
    });
});

// Export router
module.exports = postRouter;
