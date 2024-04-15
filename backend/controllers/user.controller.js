const mongoose = require("mongoose");
const User = require("../models/user.model");

// 1. Create a new user
const createUser = async (userDetails) => {
  try {
    const user = await User(userDetails);
    const newUser = await user.save();

    return { message: "User successfully created!", newUser };
  } catch (error) {
    console.log(error);
    return { error: "User already exists!" };
  }
};

// Exporting the controllers
module.exports = { createUser };
