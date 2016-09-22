var express = require('express');
var bookRouter = express.Router();

var router = function (nav, booksList) {

    bookRouter.route('/')
    .get(function(req, res) {
        res.render('books', {title: 'Library - Books', books: booksList, nav: nav});
    });

    bookRouter.route('/:id')
    .get(function(req, res) {
        var id = req.params.id;
        res.render('books', {title: 'Library - ' + booksList[id].name, books: [booksList[id]], nav: nav});
    });

    return bookRouter;
};

module.exports = router;
