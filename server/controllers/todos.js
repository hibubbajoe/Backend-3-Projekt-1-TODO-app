var Todo = require("../models/Todo");
var TodoCategory = require("../models/TodoCategory");
var checkUser = require("../utils/checkUser");

exports.createTodo = async (req, res) => {
    const userToken = req.headers.token;
    const userId = checkUser(userToken);

    const newTodo = {
        title: req.body.title,
        body: req.body.body,
        category: req.body.category,
        author: userId,
    };

    const todo = new Todo(newTodo);
    todo.save().then(todo => res.json(todo));
};

exports.getTodoById = (req, res) => {
    itemId = req.params.id;

    Todo.findOne({ _id: itemId }).exec((err, todo) => {
        res.json(todo);
    });
}

exports.getUserTodos = (req, res) => {
    const userToken = req.headers.token;
    const userId = checkUser(userToken);

    console.log(userId);
    Todo.find({ author: userId }).exec((err, todos) => {
        res.json(todos);
    });
}

exports.updateTodo = async (req, res) => {
    const id = req.params.id;
    const { title, body, category } = req.body;

    Todo.findOne({ _id: req.params.id }, (err, todo) => {
        todo.title = title ? title : ""
        todo.body = body ? body : ""
        todo.category = req.body.category
        todo.save()
    })
}

exports.deleteTodo = (req, res) => {
    const itemId = req.params.id;

    Todo.findOneAndDelete({ _id: itemId }).exec((err, todo) => {
        res.json(todo);
    });
}