const express = require('express');
const router = express.Router();

let messages = []; // In-memory message database
let users = []; // In-memory user database

// Function to send a message
router.post('/send', (req, res) => {
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

    messages.push({ fromEmail, toEmail, message });
    res.status(201).json({ message: 'Message sent successfully' });
});

module.exports = router; 