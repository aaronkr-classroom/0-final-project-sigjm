"use strict";

const mongoose = require("mongoose"),
    Book = require("../models/Book");

// 데이터베이스 연결 설정
mongoose.connect(
    "mongodb+srv://jmllem:J0Mr5PUxBlcrlDio@jmllem.f6uraub.mongodb.net/?retryWrites=true&w=majority&appName=Jmllem/ut-node",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection;

var books = [
    {
        _id: new mongoose.Types.ObjectId(),
        title: "Harry Potter and the Sorcerer's Stone",
        description: "A young wizard's journey begins.",
        price: 20000,
        courseImg: "",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "The Hobbit",
        description: "Bilbo Baggins' unexpected adventure.",
        price: 25000,
        courseImg: "",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "1984",
        description: "A dystopian novel by George Orwell.",
        price: 18000,
        courseImg: "",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "To Kill a Mockingbird",
        description: "A novel about the serious issues of race and rape.",
        price: 22000,
        courseImg: "",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "Pride and Prejudice",
        description: "A classic novel of manners by Jane Austen.",
        price: 21000,
        courseImg: "",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "The Great Gatsby",
        description: "A novel about the American dream.",
        price: 20000,
        courseImg: "",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "Moby-Dick",
        description: "The saga of Captain Ahab and his relentless pursuit of Moby Dick.",
        price: 24000,
        courseImg: "",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "War and Peace",
        description: "A historical novel by Leo Tolstoy.",
        price: 30000,
        courseImg: "",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "The Catcher in the Rye",
        description: "A story about adolescent alienation and loss.",
        price: 19000,
        courseImg: "",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "The Lord of the Rings",
        description: "An epic fantasy novel by J.R.R. Tolkien.",
        price: 35000,
        courseImg: "",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "Crime and Punishment",
        description: "A novel by Fyodor Dostoevsky.",
        price: 28000,
        courseImg: "",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "The Brothers Karamazov",
        description: "A philosophical novel by Fyodor Dostoevsky.",
        price: 32000,
        courseImg: "",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "The Adventures of Huckleberry Finn",
        description: "A novel by Mark Twain.",
        price: 20000,
        courseImg: "",
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "Brave New World",
        description: "A dystopian novel by Aldous Huxley.",
        price: 21000,
        courseImg: "",
    },
];

var commands = [];

// 이전 데이터 모두 삭제
Book.deleteMany({})
    .exec()
    .then((result) => {
        console.log(`Deleted ${result.deletedCount} book records!`);
    });

setTimeout(() => {
    // 프라미스 생성을 위한 책 객체 루프
    books.forEach((b) => {
        commands.push(
            Book.create({
                _id: b._id,
                title: b.title,
                description: b.description,
                price: b.price,
                courseImg: b.courseImg,
            }).then((book) => {
                console.log(`Created book: ${book.title}`);
            })
        );
    });

    console.log(`${commands.length} commands created!`);

    Promise.all(commands)
        .then((r) => {
            console.log(JSON.stringify(r));
            mongoose.connection.close();
            console.log("Connection closed!");
        })
        .catch((error) => {
            console.log(`Error: ${error}`);
        });
}, 500);
