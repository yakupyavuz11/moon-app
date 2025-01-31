const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');

const router = express.Router();

let users = []; // In-memory user database
let messages = []; // In-memory message database

// Photo upload settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// User Registration
router.post('/register', upload.single('photo'), (req, res) => {
    const { email, username, password, birthdate, gender, about = '' } = req.body;
    const photo = req.file ? req.file.path : null;

    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { email, username, password: hashedPassword, birthdate, gender, photo, about, blockedUsers: [] };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully' });
});

// User Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ email: user.email }, 'secretKey', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
});

// Logout
router.post('/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

// Delete Account
router.delete('/delete', (req, res) => {
    const userEmail = req.user.email; // User from JWT

    // Delete user
    users = users.filter(user => user.email !== userEmail);

    // Delete user's messages
    messages = messages.filter(msg => msg.fromEmail !== userEmail && msg.toEmail !== userEmail);

    res.json({ message: 'Account deleted successfully' });
});

// Update Profile
router.put('/update', upload.single('photo'), (req, res) => {
    const userEmail = req.user.email; // User from JWT
    const { username, about } = req.body;
    const photo = req.file ? req.file.path : null;

    const user = users.find(user => user.email === userEmail);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (username) user.username = username;
    if (about) user.about = about;
    if (photo) user.photo = photo;

    res.json({ message: 'Profile updated successfully', user });
});

// Change Email
router.put('/change-email', (req, res) => {
    const userEmail = req.user.email; // User from JWT
    const { newEmail, password } = req.body;

    const user = users.find(user => user.email === userEmail);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    user.email = newEmail;
    res.json({ message: 'Email updated successfully' });
});

// Change Password
router.put('/change-password', (req, res) => {
    const userEmail = req.user.email; // User from JWT
    const { oldPassword, newPassword } = req.body;

    const user = users.find(user => user.email === userEmail);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid old password' });
    }

    user.password = bcrypt.hashSync(newPassword, 10);
    res.json({ message: 'Password updated successfully' });
});

// Suspend Account
router.put('/suspend', (req, res) => {
    const userEmail = req.user.email; // User from JWT

    const user = users.find(user => user.email === userEmail);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.suspended = true;
    res.json({ message: 'Account suspended successfully' });
});

module.exports = router; 