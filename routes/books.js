var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Books() {
  return knex('books');
}
/*get books on main page*/
router.get('/', function(req, res, next) {
  Books().select().then(function (books) {
    res.render('books/index', {books: books});
  })
});

router.post('/', function (req, res, next) {
  Books().insert(req.body).then(function (results) {
    res.redirect('/books');
  })
})
/*add a new book*/
router.get('/new', function(req, res, next) {
  res.render('books/new');
});

router.post('/new', function (req, res, next){
  Books().insert(req.body).then(function (results){
    res.redirect('/books');
  });
});

/*show my new books and a book title*/
router.get('/:id/show', function(req, res, next) {
  Books().where('id', req.params.id).first().then(function (results) {
    res.render('books/show', {book: results, id:req.params.id});
  });
});

router.get('/:id/edit', function(req, res, next) {
  Books().where('id', req.params.id).first().then(function (book) {
    res.render('books/edit', {book: book});
  });
});

router.post('/books/:id', function (req, res, next) {
  Books().where('id', req.params.id).update(req.body).then(function (results) {
    res.redirect('/books');
  })
});

router.post(':id/delete', function (req, res, next) {
  Books().where('id', req.params.id).del().then(function (results) {
    res.redirect('/books');
  })
})

module.exports = router;
