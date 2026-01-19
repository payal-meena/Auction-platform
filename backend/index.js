// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(port, () => {
//     console.log("Backend Is Running");
//   console.log(`Server is running on port ${port}`);
// });
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const port = process.env.Port ||3000;

dotenv.config();
connectDB(); // 🔥 sirf ek baar

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(port, () => {
    console.log("Backend Is Running");
  console.log(`Server is running on port ${port}`);
});