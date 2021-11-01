var express = require('express');
var router = express.Router();

const { addNewUser, getUser } = require('../controllers/users');

// /* GET users listing. */
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', getUser)
router.post('/', addNewUser)

module.exports = router;
