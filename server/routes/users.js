const express = require('express');

const router = express.Router();

const { addNewUser, getUser, loginUser } = require('../controllers/users');

router.get('/', getUser);
router.post('/login', loginUser);
router.post('/', addNewUser);

module.exports = router;
