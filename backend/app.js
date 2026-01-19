const express = require("express");

const userRoutes = require("./routes/userRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();

// Global middleware
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);

module.exports = app;
