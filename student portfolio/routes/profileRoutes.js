
const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

router.get("/", async (req, res) => {
  const data = await Profile.find();
  res.json(data);
});

router.post("/", async (req, res) => {
  const profile = new Profile(req.body);
  await profile.save();
  res.json(profile);
});

module.exports = router;
