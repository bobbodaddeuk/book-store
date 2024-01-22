// /schemas/goods.js

import mongoose from "mongoose";

// 상품 정보 스키마
const booksSchema = new mongoose.Schema({
  booksId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
    unique: false,
  },
  content: {
    type: String,
    required: true,
    unique: false,
  },
  createdAt: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
});

export default mongoose.model("books", booksSchema);
