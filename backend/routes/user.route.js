const express = require("express");
const userRouter = express.Router();
const { createUser } = require("../controllers/user.controller");

// Create new user
userRouter.post("/signup", async (req, res) => {
  try {
    const createdUser = await createUser(req.body);
    const { message, error, newUser } = createdUser;

    if (message) {
      res.status(201).json({ message, newUser });
    }

    if (error) {
      res.status(409).json({ error });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error", error });
  }
});

// Export router
module.exports = userRouter;
