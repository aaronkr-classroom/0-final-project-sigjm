// routes/courseRoutes.js
"use strict";

/**
 * Listing 26.1 (p. 380)
 * @TODO: Course 라우트의 books Routes.js로의 이동
 */
const router = require("express").Router(),
    booksController = require("../controllers/booksController");

/**
 * Courses
 */
router.get("/", booksController.index, booksController.indexView); // index 라우트 생성
router.get("/new", booksController.new); // 생성 폼을 보기 위한 요청 처리
router.post(
    "/create",
    booksController.create,
    booksController.redirectView
); // 생성 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.get("/:id", booksController.show, booksController.showView);
router.get("/:id/edit", booksController.edit); // viewing을 처리하기 위한 라우트 추가
router.put(
    "/:id/update",
    booksController.update,
    booksController.redirectView
); // 편집 폼에서 받아온 데이터의 처리와 결과를 사용자 보기 페이지에 보여주기
router.delete(
    "/:id/delete",
    booksController.delete,
    booksController.redirectView
);

module.exports = router;
