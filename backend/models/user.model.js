const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // Name
  name: {
    type: String,
    required: true,
  },

  // Email
  email: {
    type: String,
    required: true,
    unique: true,
  },

  // Password
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
