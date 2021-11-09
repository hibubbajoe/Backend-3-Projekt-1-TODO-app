const express = require('express');

const router = express.Router();
const {
  createTodo, getTodoById, getUserTodos, updateTodo, deleteTodo,
} = require('../controllers/todos');
const authUser = require('../middlewares/authUser');

/* GET ALL ITEMS */
router.get('/', authUser, getUserTodos);

/* GET ITEM BY ID */
router.get('/:id', authUser, getTodoById);

/* ADD NEW TODO ITEM */
router.post('/', authUser, createTodo);

/* UPDATE ITEM BY ID */
router.post('/:id', authUser, updateTodo);

/* DELETE  ITEM BY ID */
router.delete('/:id', authUser, deleteTodo);

module.exports = router;
