const User = require('../models/User');

// Function to update the subscription status of a user
const updateSubscription = async (req, res) => {
    try {
        const { userId, subscription } = req.body;
        if (!userId || !subscription) {
            return res.status(400).json({ error: 'All the Details are required' });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { subscription },
            { new: true } // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Subscription updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    updateSubscription,
    getAllUsers,
    deleteUser, // Ensure deleteUser is exported here
};
