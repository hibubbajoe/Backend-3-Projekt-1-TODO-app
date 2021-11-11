const Todo = require("../models/Todo");
const TodoCategory = require("../models/TodoCategory");
const checkUser = require("../utils/checkUser");

exports.createTodo = async (req, res) => {
  const userToken = req.headers.token;
  const userId = checkUser(userToken);

  try {
    if (!req.body.hasOwnProperty("body")) {
      return res.status(400).json("Please fill in required fields.");
    }
    const newTodo = {
      title: req.body.title,
      body: req.body.body,
      category: req.body.category,
      author: userId
    };
    const todo = new Todo(newTodo);
    todo.save().then(todo => res.json(todo));
  } catch (err) {
    res.status(400).json("Something went wrong.");
  }
};

exports.getTodoById = (req, res) => {
  itemId = req.params.id;

  Todo.findOne({ _id: itemId }).exec((err, todo) => {
    res.json(todo);
  });
};

exports.getUserTodos = (req, res) => {
  const userToken = req.headers.token;
  const userId = checkUser(userToken);

  Todo.find({ author: userId }).exec((err, todos) => {
    res.json(todos);
  });
};

exports.updateTodo = async (req, res) => {
  try {
    if (req.body.body.length === 0) {
      return res.status(400).json("Please fill in required fields.");
    }

    Todo.findOne({ _id: req.params.id }, (err, todo) => {
      todo.title = req.body.title || "";
      todo.body = req.body.body || "";
      todo.category = req.body.category;
      todo.save();
    });
  } catch (err) {
    return res.status(400).json("Something went wrong.");
  }
};

exports.deleteTodo = (req, res) => {
  const itemId = req.params.id;

  Todo.findOneAndDelete({ _id: itemId }).exec((err, todo) => {
    res.json(todo);
  });
};
