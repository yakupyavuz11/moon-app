const express = require('express');
const router = express.Router();

let messages = []; // In-memory message database
let users = []; // In-memory user database

// Function to generate a random anonymous name
function generateRandomAnonName() {
    return `anon-${Math.floor(Math.random() * 1000000)}`;
}

// Send an anonymous message
router.post('/message', (req, res) => {
    const { toEmail, message } = req.body;
    const fromEmail = req.user.email; // User from JWT

    const recipient = users.find(user => user.email === toEmail);
    if (!recipient) {
        return res.status(404).json({ message: 'Recipient not found' });
    }

    // Check if blocked
    if (recipient.blockedUsers.includes(fromEmail)) {
        return res.status(403).json({ message: 'You are blocked by this user' });
    }

    const anonName = generateRandomAnonName();
    messages.push({ fromEmail, toEmail, message, anonName });
    res.status(201).json({ message: 'Message sent successfully', anonName });
});

// View message history
router.get('/find', (req, res) => {
    const userEmail = req.user.email; // User from JWT

    const userMessages = messages.filter(
        msg => msg.fromEmail === userEmail || msg.toEmail === userEmail
    ).map(msg => ({
        ...msg,
        fromEmail: msg.fromEmail === userEmail ? 'You' : msg.anonName
    }));

    res.json(userMessages);
});

module.exports = router; 