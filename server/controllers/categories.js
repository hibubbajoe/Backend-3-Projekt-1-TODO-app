var TodoCategory = require("../models/TodoCategory");
var Todo = require("../models/Todo");
var checkUser = require("../utils/checkUser");

exports.getCategories = (req, res) => {
    const userToken = req.headers.token;
    const userId = checkUser(userToken);

    TodoCategory.find({ author: userId }).exec((err, todos) => {
        res.json(todos);
    });
}
exports.createCategory = (req, res) => {
    const userToken = req.headers.token;
    const userId = checkUser(userToken);

    const newTodoCategory = {
        category: req.body.category,
        author: userId
    };

    const category = new TodoCategory(newTodoCategory);
    category.save().then(category => res.json(category));
}


exports.deleteCategory = async (req, res) => {
    const id = req.params.id;
    const userToken = req.headers.token;
    const userId = checkUser(userToken);

    await Todo.updateMany({ category: id }, { $set: { "category": null } });

    TodoCategory.findOneAndDelete({ _id: id }).exec((err, todo) => {
        res.json(todo);
    });
}