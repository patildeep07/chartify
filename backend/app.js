// Requiring module
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// Creating express object
const app = express();
app.use(express.json());

// Setting up connection
const initialiseDatabase = require("./connection/db.connect");
initialiseDatabase();

// Adding middlewares
app.use(cors());
app.use(helmet());

// Importing user router
const UserRouter = require("./routes/user.route");
app.use("/users", UserRouter);

// Handling GET request
app.get("/", (req, res) => {
  res.send("Hello");
});

// Port Number
const PORT = process.env.PORT || 5000;

// Server Setup
app.listen(PORT, console.log(`Server started on port ${PORT}`));
