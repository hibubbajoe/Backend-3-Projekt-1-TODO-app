const express = require('express');

const router = express.Router();
const { getCategories, createCategory, deleteCategory } = require('../controllers/categories');
const authUser = require('../middlewares/authUser');

/* GET TODO CATEGORY */
router.get('/', authUser, getCategories);

/* ADD TODO CATEGORY */
router.post('/', authUser, createCategory);

/* DELETE TODO CATEGORY */
router.delete('/:id', authUser, deleteCategory);

module.exports = router;
