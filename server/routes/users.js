const express = require('express');

const router = express.Router();

const { addNewUser, loginUser } = require('../controllers/users');

router.post('/login', loginUser);
router.post('/', addNewUser);

module.exports = router;
