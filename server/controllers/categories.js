var TodoCategory = require("../models/TodoCategory");
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