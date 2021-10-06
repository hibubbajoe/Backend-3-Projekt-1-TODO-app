var express = require("express");
var router = express.Router();
var Todo = require("../models/Todo");

/* GET ALL ITEMS */
router.get("/todos", function(req, res, next) {
  Todo.find().exec((err, todos) => {
    res.json(todos);
    // if (todos) {
    //     res.status(200).json(todos);
    // } else {
    //     res.status(404);
    // }
  });
});

/* ADD NEW TODO ITEM */
router.post("/todos", function(req, res, next) {
  const newTodo = {
    title: req.body.title,
    body: req.body.body
  };

  const todo = new Todo(newTodo);
  todo.save().then(todo => res.json(todo));
});

/* GET ITEM BY ID */
router.get("/todos/:id", function(req, res, next) {
  itemId = req.params.id;

  Todo.findOne({ _id: itemId }).exec((err, todo) => {
    res.json(todo);
  });
});

/* DELETE  ITEM BY ID */
router.delete("/todos/:id", function(req, res, next) {
  const itemId = req.params.id;
  console.log("hej " + itemId);

  Todo.findOneAndDelete({ _id: itemId }).exec((err, todo) => {
    res.json(todo);
  });
});

module.exports = router;
