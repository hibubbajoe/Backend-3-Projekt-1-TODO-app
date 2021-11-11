const express = require('express');

const router = express.Router();

const { addNewUser, loginUser, loggedInUser } = require('../controllers/users');

router.post('/login', loginUser);
router.get('/loggedInUser', loggedInUser);
router.post('/', addNewUser);

module.exports = router;
