const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // ← You need this
const studentRoutes = require('./routes/studentRoutes'); // ← You need this

const app = express();

// 1. This line is MISSING - without it req.body is empty
app.use(express.json());

// 2. This line is MISSING - serves your CSS and JS files  
app.use(express.static('public'));

// MongoDB connection - USE LOCAL
mongoose.connect("mongodb://127.0.0.1:27017/studentPortfolioDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// API routes
app.use("/api/students", studentRoutes);

// Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(5000, () => console.log("Server running on port 5000"));