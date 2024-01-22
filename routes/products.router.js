import express from "express";
import books from "../schemas/products.schema.js";

const router = express.Router();

// 상품 작성 API
router.post("/create", async (req, res) => {
  const { name, content, author, password } = req.body;

  if (!name || !content || !author || !password) {
    return res.status(400).json({ message: "전부 작성해주세요." });
  }
  let lastBook = await books.findOne().sort("-booksId").exec();
  const newBook = new books({
    booksId: lastBook.booksId + 1,
    name,
    content,
    author,
    status: "FOR_SALE",
    createdAt: new Date(),
    password,
  });

  await newBook.save();

  return res.status(201).json({ book: newBook });
});

// 목록 조회 API
router.get("/list", async (req, res) => {
  const sortedBooks = await books.find().sort("-booksId").exec();
  return res.status(200).json({ books: sortedBooks });
});

//상세 목록 조회 API
router.get("/list/:booksId", async (req, res) => {
  const booksId = req.params.booksId;
  const book = await books.findOne({ booksId: +booksId }).exec();

  if (!book) {
    return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
  }

  return res.status(200).json(book);
});

//상품 정보 수정 API
router.put("/list/:booksId", async (req, res) => {
  const booksId = req.params.booksId;
  const { name, content, status, password } = req.body;

  const book = await books.findOne({ booksId: +booksId }).exec();

  if (!book) {
    return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
  }

  if (+password !== book.password) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  book.name = name || book.name;
  book.content = content || book.content;
  book.status = status || book.status;

  book.save();
  return res.status(200).json(book);
});

// 상품 삭제 API
router.delete("/list/:booksId", async (req, res) => {
  const booksId = req.params.booksId;
  const { password } = req.body;

  const book = await books.findOne({ booksId: +booksId }).exec();
  if (!book) {
    return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
  }

  if (+password !== book.password) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  await books.deleteOne({ booksId: +booksId }).exec();

  return res
    .status(200)
    .json({ message: `상품 ID ${booksId}가 삭제되었습니다.` });
});

export default router;
