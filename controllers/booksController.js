"use strict";

const Book = require("../models/Book"),
    User = require("../models/User"),
    httpStatus = require("http-status-codes");

module.exports = {
    respondJSON: (req, res) => {
        res.json({
            status: httpStatus.OK,
            data: res.locals,
        });
    },

    errorJSON: (error, req, res, next) => {
        let errorObject;
        if (error) {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        } else {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: "Unknown Error.",
            };
        }
        res.json(errorObject);
    },

    join: (req, res, next) => {
        let bookId = req.params.id,
            currentUser = req.user;
        if (currentUser) {
            User.findByIdAndUpdate(currentUser, {
                $addToSet: {
                    books: bookId,
                },
            })
                .then(() => {
                    res.locals.success = true;
                    next();
                })
                .catch((error) => {
                    next(error);
                });
        } else {
            next(new Error("User must log in."));
        }
    },

    filterUserBooks: (req, res, next) => {
        let currentUser = req.user;
        if (currentUser) {
            let mappedBooks = res.locals.books.map((book) => {
                let userJoined = currentUser.books.some((userBook) => {
                    return userBook.equals(book._id);
                });
                return Object.assign(book.toObject(), { joined: userJoined });
            });
            res.locals.books = mappedBooks;
            next();
        } else {
            next();
        }
    },

    index: (req, res, next) => {
        Book.find()
            .then((books) => {
                res.locals.books = books;
                next();
            })
            .catch((error) => {
                console.log(`Error fetching books: ${error.message}`);
                next(error);
            });
    },

    indexView: (req, res) => {
        if (req.query.format === "json") {
            res.json(res.locals.books);
        } else {
            res.render("books/index", {
                page: "Books",
                title: "All Books",
            });
        }
    },

    new: (req, res) => {
        res.render("books/new", {
            page: "new-book",
            title: "New Book",
        });
    },

    create: (req, res, next) => {
        let bookParams = {
            title: req.body.title,
            description: req.body.description,
            maxStudents: req.body.maxStudents,
            cost: req.body.cost,
        };
        Book.create(bookParams)
            .then((book) => {
                res.locals.redirect = "/books";
                res.locals.book = book;
                next();
            })
            .catch((error) => {
                console.log(`Error saving book: ${error.message}`);
                next(error);
            });
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },

    show: (req, res, next) => {
        let bookId = req.params.id;
        Book.findById(bookId)
            .then((book) => {
                res.locals.book = book;
                next();
            })
            .catch((error) => {
                console.log(`Error fetching book by ID: ${error.message}`);
                next(error);
            });
    },

    showView: (req, res) => {
        res.render("books/show", {
            page: "book-details",
            title: "Book Details",
        });
    },

    edit: (req, res, next) => {
        let bookId = req.params.id;
        Book.findById(bookId)
            .then((book) => {
                res.render("books/edit", {
                    book: book,
                    page: "edit-book",
                    title: "Edit Book",
                });
            })
            .catch((error) => {
                console.log(`Error fetching book by ID: ${error.message}`);
                next(error);
            });
    },

    update: (req, res, next) => {
        let bookId = req.params.id,
            bookParams = {
                title: req.body.title,
                description: req.body.description,
                maxStudents: req.body.maxStudents,
                cost: req.body.cost,
            };
        Book.findByIdAndUpdate(bookId, {
            $set: bookParams,
        })
            .then((book) => {
                res.locals.redirect = `/books/${bookId}`;
                res.locals.book = book;
                next();
            })
            .catch((error) => {
                console.log(`Error updating book by ID: ${error.message}`);
                next(error);
            });
    },

    delete: (req, res, next) => {
        let bookId = req.params.id;
        Book.findByIdAndRemove(bookId)
            .then(() => {
                res.locals.redirect = "/books";
                next();
            })
            .catch((error) => {
                console.log(`Error deleting book by ID: ${error.message}`);
                next(error);
            });
    },
};
