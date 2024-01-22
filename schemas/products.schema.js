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
    unique: true,
  },
  content: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Books", booksSchema);
