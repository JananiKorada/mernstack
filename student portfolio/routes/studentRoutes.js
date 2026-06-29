const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: 'Student added' });
  } catch (error) {
    console.log('POST Error:', error); // This shows real error
    res.status(500).json({ error: 'Error adding student' });
  }
});

router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.log('GET Error:', error);
    res.status(500).json({ error: 'Error loading students' });
  }
});

module.exports = router;