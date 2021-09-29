var express = require("express");
var router = express.Router();
var Todo = require("../models/Todo");

let todos = [
  {
    id: 1,
    title: "Hej",
    body: "Jag är item 1"
  },
  {
    id: 2,
    title: "Hej 2",
    body: "Jag är item 2"
  },
  {
    id: 3,
    title: "Hej 3",
    body: "Jag är item 3"
  }
];

/* GET ALL ITEMS */
router.get("/todos", function(req, res, next) {
  res.json(todos);
});

/* GET ITEM BY ID */
router.get("/item/:id", function(req, res, next) {
  const itemId = req.params.id;
  const item = items.find(item => item.id == itemId);
  res.json(item);
});

router.post("/todo", function(req, res, next) {
  const newTodo = {
    title: req.body.title,
    body: req.body.body
  };

  const todo = new Todo(newTodo);
  todo.save().then(todo => res.json(todo));
});

/* DELETE NEW ITEM */
router.delete("/item/:id"),
  function(req, res, next) {
    const id = req.params.id;
    if (!id) {
    }
  };

module.exports = router;
