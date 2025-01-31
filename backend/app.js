require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const authController = require("./controllers/authController");
const messageRouter = require("./controllers/messageController");
const anonymousRouter = require("./controllers/anonymousController");
const userRouter = require("./controllers/userController");

const app = express();
app.use(bodyParser.json());

// Middleware to authenticate and attach user to request
app.use((req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            req.user = decoded;
            next();
        });
    } else {
        next();
    }
});

// Auth Routes
app.post("/api/auth/register", authController.register);
app.post("/api/auth/login", authController.login);

// Message Routes
app.use("/api/messages", messageRouter);

// Anonymous Routes
app.use("/api/anonymous", anonymousRouter);

// User Routes
app.use("/api/users", userRouter);

// Start the server
const PORT = process.env.PORT || 3000;
const HOST = '185.95.164.220'; // Burada IP adresinizi ayarlayın
app.listen(PORT, HOST, () => {
  console.log(`Sunucu ${HOST}:${PORT} adresinde çalışıyor.`);
});
