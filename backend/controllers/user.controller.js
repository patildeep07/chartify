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

// 2. User login
const loginUser = async (userDetails) => {
  try {
    const { email, password } = userDetails;
    const matchedUser = await User.findOne({ email });

    if (matchedUser) {
      if (matchedUser.password === password) {
        return { message: "User successfully logged in!", user: matchedUser };
      } else {
        return { error: "Incorrect password!" };
      }
    } else {
      return { error: "Email does not exists!" };
    }
  } catch (error) {
    console.log(error);
    return { error: "Unable to login!" };
  }
};

// Exporting the controllers
module.exports = { createUser, loginUser };
