const Membership = require('../models/Membership');  // Ensure this model is defined

// Create a membership plan
exports.createMembership = async (req, res) => {
  const { name, price, benefits, duration } = req.body;

  try {
    const newMembership = new Membership({ name, price, benefits, duration });
    await newMembership.save();
    res.status(201).json({ message: 'Membership plan created successfully', membership: newMembership });
  } catch (error) {
    res.status(500).json({ error: 'Error creating membership plan' });
  }
};

// Get all memberships
exports.getAllMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving memberships' });
  }
};
