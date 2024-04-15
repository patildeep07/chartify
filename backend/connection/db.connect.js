const mongoose = require("mongoose");

require("dotenv").config();
const mongoURI = process.env.MONGOURI;

const initialiseDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoURI);

    if (connection) {
      console.log("Connected to mongoDB");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = initialiseDatabase;
