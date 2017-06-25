const express = require('express');
var router = express.Router();


var Books = require('../models').Books;
var Loans = require('../models').Loans;
var Patrons = require('../models').Patrons;

// Books routes

// GET books from database to display in views/books.pug
router.get('/', function (req, res, next) {
  
	Books.findAll({order: [["first_published"]]}).then(function(books){
		res.render("all_books", {books: books})
	}).catch(function(error){
		res.status(500).send(error);
	});

  //res.render('all_books');
});

/** GET checked out books page. */
router.get('/checked_out', function(req, res, next) {
  Books.findAll({
    include: [{
      model: Loans,
      where: {
        returned_on: {
          $or: ['', null]
        }
      }
    }]
  }).then(function(results) {
    res.render('checked_books', {
      books: results,
      title: "Checked Out Books"
    });
  }).catch(function(error) {
    res.send(500, error);
  });
});



/** POST create new book. */
router.post('/new', function(req, res, next) {
  Books.create(req.body).then(function(results) {
    res.redirect("/books/");
  }).catch(function(error) {
    if (error.name === 'SequelizeValidationError') {
      res.render('new_book', {
        title: "New Book",
        error: error
      }).catch(function(error) {
        res.status(500).send(error);
      });
    } else {
      res.status(500).send(error);
    }
  });
});

// GET /books/new - New Book
router.get('/new', function(req, res, next) {
	res.render('new_book', {book: Books.build()});
});


//router.post('/', function (req, res, next) {

//	Books.create(req.body).then(function(books) {
//		res.redirect("/" + book.id);
//	})
 // res.render('all_books')
//})

//router.get('/new', function (req, res, next) {
//  res.render('new_book', {title: Books.build(), title:"New Book", author:"New Author", genre:"New Genre", first_published:"03/12/2000"});
//})

// GET /books/:id - Individual Book detail and Loan History
router.get('/:id', function(req, res, next) {

		/*
		 * SELECT * FROM BOOKS WHERE ID = REQ.PARAMS.ID;
		 */
	Books.findById(req.params.id).then(function(book) {
		/*
		 * Set Associations
		 */
		Loans.belongsTo(Books, {foreignKey: 'book_id'});
		Loans.belongsTo(Patrons, {foreignKey: 'patron_id'});

		/*
		 * SELECT * 
		 * FROM LOANS A 
		 * INNER JOIN BOOKS B 
		 * 		ON A.BOOK_ID = B.ID
		 * INNER JOIN PATRONS C
		 *      ON A.PATRON_ID = C.ID 
		 * WHERE 
		 *      A.BOOK_ID = REQ.PARAMS.ID;
		*/

		Loans.findAll({
			include: [
					  {model: Books,required: true}, 
					  {model: Patrons,required: true}
					 ],
			where: {
				book_id: req.params.id
			}
		}).then(function(data) {
			res.render('book_detail', {book: book, loans: data});
		}).catch(function(err) {
    		res.sendStatus(500);
  		});
	});
});

// PUT /books/:id - Update Book
router.put('/:id', function(req, res, next) {
	
	Books.findById(req.params.id).then(function(book) {
		return book.update(req.body);
	}).then(function() {
		res.redirect('/books');
	}).catch(function(err) {
		/*
		 * If required fields are not there, show error
		 */
		if(err.name === "SequelizeValidationError") {

			/*
	 		 * Set Associations
	  		 */
			Loans.belongsTo(Books, {foreignKey: 'book_id'});
			Loans.belongsTo(Patrons, {foreignKey: 'patron_id'});

			/*
			 * Query again to get loan History of book
			 */
			Loans.findAll({
				include: [
					{model: Books,required: true}, 
					{model: Patrons,required: true}
				],
				where: {
					book_id: req.params.id
				}
			}).then(function(data) {
		
				req.body.id = req.params.id;
				res.render('book_detail', {
					book: req.body, 
					loans: data,
					errors: err.errors
				}); // End of res.render 
			}).catch(function(err) {
    			res.sendStatus(500);
  			}); // End of Loans.findAll
		} else {
			throw err;
		} // End If

	}).catch(function(err) {
		res.sendStatus(500);
	});
});



router.get('books?filter=overdue', function (req, res) {
  res.render('overdue_books')
})
router.get('/books?filter=checked_out', function (req, res) {
  res.render('checked_books')
})
router.get('/return_book', function (req, res) {
  res.render('return_book')
})


module.exports = router;