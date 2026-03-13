const express = require('express');
const { registerUser, loginUser, getAllUsers } = require('../controllers/userController');

const router = express.Router();

// POST /register - Create a new user
router.post('/register', registerUser);

// POST /login - Check email and password
router.post('/login', loginUser);

// GET /users - Return all users
router.get('/users', getAllUsers);

module.exports = router;