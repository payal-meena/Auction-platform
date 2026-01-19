
const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");

dotenv.config();
connectDB(); // 🔥 sirf ek baar

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/users", userRoutes);
app.listen(port, () => {
    console.log("Backend Is Running");
  console.log(`Server is running on port ${port}`);
});