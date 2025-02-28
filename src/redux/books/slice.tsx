import { createSlice } from "@reduxjs/toolkit";

interface BooksState {}

const initialState: BooksState = {};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
});
export default booksSlice.reducer;
