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

/* GET home page. */
router.get('/items', function (req, res, next) {
    res.json(items);
});


module.exports = router;
