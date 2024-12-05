const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Route for user registration
router.post('/register', userController.register);

// Route for user login
router.post('/login', userController.login);

// Route for user by id
router.get('/:_id', userController.getUserById);


module.exports = router;
