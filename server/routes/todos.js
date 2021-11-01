var express = require("express");
var router = express.Router();
var Todo = require("../models/Todo");

/* GET ALL ITEMS */
router.get("/", function (req, res, next) {
  Todo.find().exec((err, todos) => {
    res.json(todos);
  });
});

/* GET ITEM BY ID */
router.get("/:id", function (req, res, next) {
  itemId = req.params.id;

  Todo.findOne({ _id: itemId }).exec((err, todo) => {
    res.json(todo);
  });
});

/* ADD NEW TODO ITEM */
router.post("/", function (req, res, next) {
  const newTodo = {
    title: req.body.title,
    body: req.body.body
  };

  const todo = new Todo(newTodo);
  todo.save().then(todo => res.json(todo));
});

router.post("/:id", function (req, res, next) {
  const id = req.params.id;
  const { title, body } = req.body;

  Todo.findOne({ _id: req.params.id }, (err, todo) => {
    todo.title = title
    todo.body = body
    todo.save()
  })
})

/* DELETE  ITEM BY ID */
router.delete("/:id", function (req, res, next) {
  const itemId = req.params.id;

  Todo.findOneAndDelete({ _id: itemId }).exec((err, todo) => {
    res.json(todo);
  });
});

module.exports = router;
