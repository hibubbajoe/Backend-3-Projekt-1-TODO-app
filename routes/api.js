var express = require('express');
var router = express.Router();

let items = [
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
]

/* GET ALL ITEMS */
router.get('/items', function (req, res, next) {
    res.json(items);
});

/* GET ITEM BY ID */
router.get('/item/:id', function (req, res, next) {
    const itemId = req.params.id;
    const item = items.find(item => item.id == itemId);
    res.json(item);
});

/* POST NEW ITEM */
router.post('/items', function (req, res, next) {
    const newItem = req.body;
    items.forEach((item) => {
        if (newItem.id <= item.id) {
            newItem.id = item.id;
        }
    });
    newItem.id++;
    console.log(newItem);
});




module.exports = router;
