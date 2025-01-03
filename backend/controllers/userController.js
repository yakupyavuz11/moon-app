const express = require('express');
const router = express.Router();

let users = []; // In-memory user database

// Get a random profile
router.get('/random', (req, res) => {
    if (users.length === 0) {
        return res.status(404).json({ message: 'No profiles available' });
    }
    const randomUser = users[Math.floor(Math.random() * users.length)];
    res.json({ email: randomUser.email, username: randomUser.username });
});

// Block a user
router.post('/block', (req, res) => {
    const { emailToBlock } = req.body;
    const userEmail = req.user.email; // User from JWT

    const user = users.find(user => user.email === userEmail);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (!user.blockedUsers.includes(emailToBlock)) {
        user.blockedUsers.push(emailToBlock);
    }

    res.json({ message: 'User blocked successfully' });
});

// Unblock a user
router.post('/unblock', (req, res) => {
    const { emailToUnblock } = req.body;
    const userEmail = req.user.email; // User from JWT

    const user = users.find(user => user.email === userEmail);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user.blockedUsers = user.blockedUsers.filter(email => email !== emailToUnblock);

    res.json({ message: 'User unblocked successfully' });
});

// Filter users
router.get('/filter', (req, res) => {
    const { minAge, maxAge, gender, location } = req.query;

    const filteredUsers = users.filter(user => {
        const userAge = new Date().getFullYear() - new Date(user.birthdate).getFullYear();
        const ageMatch = (!minAge || userAge >= minAge) && (!maxAge || userAge <= maxAge);
        const genderMatch = !gender || user.gender === gender;
        const locationMatch = !location || user.location === location;

        return ageMatch && genderMatch && locationMatch;
    });

    res.json(filteredUsers);
});

// Get active users
router.get('/active-users', (req, res) => {
    const activeUserIds = getActiveUsers();
    const activeUsers = users.filter(user => activeUserIds.includes(user.email));
    res.json(activeUsers);
});

module.exports = router; 