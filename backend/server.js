const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require("./route/user");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Middleware to parse JSON data
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

// Use the user router
app.use("/api/user", userRouter());

const PORT = process.env.PORT || 4008;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
