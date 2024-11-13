// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin',
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hardcoded admin login
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            const token = jwt.sign(
                { username: ADMIN_CREDENTIALS.username, role: 'admin' },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.json({
                token,
                user: { username: ADMIN_CREDENTIALS.username, role: 'admin' },
            });
        }

        // Find user in the database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: { id: user._id, username: user.username, role: user.role },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the "customer" role
        const newUser = await User.create({
            username,
            password: hashedPassword,
            role: 'customer',
        });

        res.status(201).json({ message: 'Customer registered successfully!' });
    } catch (error) {
        console.error('Error during registration:', error); // Log the error to the console
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.addStaffMember = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the "staff" role
        const staff = await User.create({
            username,
            password: hashedPassword,
            role: 'staff',
        });

        res.status(201).json({ message: 'Staff member added successfully!' });
    } catch (error) {
        console.error('Error adding staff member:', error); // Log the error to the console
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

