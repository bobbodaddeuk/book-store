import express from "express";
import books from "../schemas/products.schema.js";

const router = express.Router();

// 상품 작성 API
router.post("/books", async (req, res) => {
  const { name, content, author, password } = req.body;

  const missingParams = [];
  if (!name) {
    missingParams.push("name");
  }
  if (!content) {
    missingParams.push("content");
  }
  if (!author) {
    missingParams.push("author");
  }
  if (!password) {
    missingParams.push("password");
  }

  if (missingParams.length > 0) {
    return res
      .status(400)
      .json({ message: `다음 항목 작성해주세요: ${missingParams.join(", ")}` });
  }
  let lastBook = await books.findOne().sort("-booksId").exec();
  const newBook = new books({
    booksId: lastBook.booksId + 1,
    name,
    content,
    author,
    password,
  });

  await newBook.save();

  return res.status(201).json({ message: "판매 상품을 등록하였습니다." });
});

// 목록 조회 API
router.get("/books", async (req, res) => {
  const sortedBooks = await books.find().sort("-booksId").exec();
  return res.status(200).json({ books: sortedBooks });
});

//상세 목록 조회 API
router.get("/books/:booksId", async (req, res) => {
  const booksId = req.params.booksId;
  const book = await books.findOne({ booksId: +booksId }).exec();

  if (!book) {
    return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
  }

  return res.status(200).json(book);
});

//상품 정보 수정 API
router.put("/books/:booksId", async (req, res) => {
  const booksId = req.params.booksId;
  const { name, content, status, password } = req.body;

  const book = await books.findOne({ booksId: +booksId }).exec();

  if (!book) {
    return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
  }

  if (password !== book.password) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  book.name = name || book.name;
  book.content = content || book.content;
  book.status = status || book.status;

  await book.save();
  return res.status(200).json(book);
});

// 상품 삭제 API
router.delete("/books/:booksId", async (req, res) => {
  const booksId = req.params.booksId;
  const { password } = req.body;

  const book = await books.findOne({ booksId: +booksId }).exec();
  if (!book) {
    return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
  }

  if (password !== book.password) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  await books.deleteOne({ booksId: +booksId }).exec();

  return res
    .status(200)
    .json({ message: `상품 ID ${booksId}가 삭제되었습니다.` });
});

export default router;
