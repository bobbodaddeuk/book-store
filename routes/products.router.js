import express from "express";

const router = express.Router();

// const db = client.db("bookStore");
// const booksCollection = db.collection("books");
// const books = await booksCollection.find({}).toArray();

// 상품 작성 API
router.post("/create", (req, res) => {
  const { name, content, author, password } = req.body;

  if (!name || !content || !author || !password) {
    return res.status(400).json({ message: "전부 작성해주세요." });
  }

  const newBook = {
    booksId: books.length + 1,
    name,
    content,
    author,
    status: "FOR_SALE",
    createdAt: new Date(),
    password,
  };

  books.push(newBook);

  return res.status(201).json({ book: newBook });
});

// 목록 조회 API
router.get("/list", (req, res) => {
  const sortedBooks = books.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return res.status(200).json({ books: sortedBooks });
});

//상세 목록 조회 API
router.get("/list/:booksId", (req, res) => {
  const booksId = req.params.booksId;
  const book = books.find((p) => p.booksId === +booksId);

  if (!book) {
    return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
  }

  return res.status(200).json({ book });
});

//상품 정보 수정 API
router.put("/list/:booksId", (req, res) => {
  const booksId = req.params.booksId;
  const { name, content, status, password } = req.body;

  const booksIndex = books.findIndex((p) => p.booksId === +booksId);

  if (booksIndex === -1) {
    return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
  }

  const book = books[booksIndex];

  if (password !== book.password) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  books[booksIndex] = {
    ...book,
    name: name || book.name,
    content: content || book.content,
    status: status || book.status,
  };

  return res.status(200).json({ book: books[booksIndex] });
});

// 상품 삭제 API
router.delete("/list/:booksId", (req, res) => {
  const booksId = req.params.booksId;
  const { password } = req.body;

  const booksIndex = books.findIndex((p) => p.booksId === +booksId);

  if (booksIndex === -1) {
    return res.status(404).json({ message: "상품 조회에 실패하였습니다." });
  }

  const book = books[booksIndex];

  if (password !== book.password) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }

  books.splice(booksIndex, 1);

  return res
    .status(200)
    .json({ message: `상품 ID ${booksId}가 삭제되었습니다.` });
});

export default router;
