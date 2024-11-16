const Class = require('../models/Class');

// Add a new class
exports.addClass = async (req, res) => {
  try {
    const { type, className, description, schedule, time, instructor, capacity, userName } = req.body;
    const newClass = new Class({ type, className, description, schedule, time, instructor, capacity, userName });
    await newClass.save();
    res.status(201).json({ message: 'Class added successfully', newClass });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all classes
exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a class by ID
exports.getClassById = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (!classItem) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.status(200).json(classItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a class
exports.updateClass = async (req, res) => {
  try {
    const { type, className, description, schedule, time, instructor, capacity, userName } = req.body;
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      { type, className, description, schedule, time, instructor, capacity, userName },
      { new: true }
    );
    if (!updatedClass) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.status(200).json({ message: 'Class updated successfully', updatedClass });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a class
exports.deleteClass = async (req, res) => {
  try {
    const classItem = await Class.findByIdAndDelete(req.params.id);
    if (!classItem) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.status(200).json({ message: 'Class deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exported function to update the attenders array and decrement capacity
exports.updateAttenders = async (req, res) => {
    try {
      const { classId, attendeeName } = req.body; // Get class ID and the new attendee name from request body
  
      // Check if both classId and attendeeName are provided
      if (!classId || !attendeeName) {
        return res.status(400).json({ error: 'Class ID and attendee name are required' });
      }
  
      // Find the class by ID
      const classItem = await Class.findById(classId);
  
      // If the class is not found, return a 404 error
      if (!classItem) {
        return res.status(404).json({ error: 'Class not found' });
      }
  
      // Check if there is capacity to add a new attendee
      if (classItem.capacity <= 0) {
        return res.status(400).json({ error: 'No more capacity left in this class' });
      }
  
      // Add the new attendee to the attenders array and decrement the capacity
      classItem.attenders.push(attendeeName);
      classItem.capacity -= 1;
  
      // Save the updated class document
      const updatedClass = await classItem.save();
  
      res.status(200).json({ message: 'Attender added successfully and capacity updated', class: updatedClass });
    } catch (error) {
      res.status(500).json({ error: 'Server error: ' + error.message });
    }
  };

  // Controller function to remove an attendee
exports.removeAttender = async (req, res) => {
    const { classId, attendeeName } = req.body;
  
    try {
      // Find the class by ID
      const classItem = await Class.findById(classId);
      if (!classItem) {
        return res.status(404).json({ message: 'Class not found' });
      }
  
      // Check if the attendee exists in the attenders list
      const attendeeIndex = classItem.attenders.indexOf(attendeeName);
      if (attendeeIndex === -1) {
        return res.status(404).json({ message: 'Attendee not found' });
      }
  
      // Remove the attendee from the attenders list
      classItem.attenders.splice(attendeeIndex, 1);
  
      // Increase the class capacity
      classItem.capacity = classItem.capacity + 1;
  
      // Save the updated class
      await classItem.save();
  
      res.status(200).json({ message: `${attendeeName} has been removed successfully` });
    } catch (error) {
      res.status(500).json({ message: 'Error removing attendee', error: error.message });
    }
  };

    // Controller function to remove an Accepted attendee
exports.removeAcceptedAttender = async (req, res) => {
  const { classId, attendeeName } = req.body;

  try {
    // Find the class by ID
    const classItem = await Class.findById(classId);
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Check if the attendee exists in the attenders list
    const attendeeIndex = classItem.attenders.indexOf(attendeeName);
    if (attendeeIndex === -1) {
      return res.status(404).json({ message: 'Attendee not found' });
    }

    // Remove the attendee from the attenders list
    classItem.attenders.splice(attendeeIndex, 1);

    // Save the updated class
    await classItem.save();

    res.status(200).json({ message: `${attendeeName} has been Accepted and removed from pendings` });
  } catch (error) {
    res.status(500).json({ message: 'Error removing attendee', error: error.message });
  }
};