const express = require('express');
const router = express.Router();

// Mock user data
let users = [];
let currentUser = null;

// User Registration
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }
    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).send('User already exists.');
    }
    users.push({ username, password });
    res.status(201).send('User registered successfully.');
});

// User Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).send('Invalid credentials.');
    }
    currentUser = user;
    res.send('Login successful.');
});

// Get Current User
router.get('/current', (req, res) => {
    if (!currentUser) {
        return res.status(401).send('No user is currently logged in.');
    }
    res.send(currentUser);
});

// Logout
router.post('/logout', (req, res) => {
    currentUser = null;
    res.send('Logout successful.');
});

module.exports = router;