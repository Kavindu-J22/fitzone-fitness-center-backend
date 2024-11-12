const Class = require('../models/Class');  // Ensure this model is defined

// Create a class
exports.createClass = async (req, res) => {
  const { name, description, schedule } = req.body;

  try {
    const newClass = new Class({ name, description, schedule });
    await newClass.save();
    res.status(201).json({ message: 'Class created successfully', class: newClass });
  } catch (error) {
    res.status(500).json({ error: 'Error creating class' });
  }
};

// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving classes' });
  }
};
