import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "../store";
import { getAllBooks } from "./ops";

export type RootState = ReturnType<typeof store.getState>;

interface Books {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  recommend: boolean;
}

interface BooksState {
  loading: boolean;
  error: boolean;
  books: Books[];
}

const initialState: BooksState = {
  loading: false,
  error: false,
  books: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        getAllBooks.fulfilled,
        (state, action: PayloadAction<Books[]>) => {
          state.loading = false;
          state.error = false;
          state.books = action.payload;
        }
      )
      .addCase(getAllBooks.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectBooks = (state: RootState) => state.books.books;
export const selectLoading = (state: RootState) => state.books.loading;
export const selectError = (state: RootState) => state.books.error;

export default booksSlice.reducer;
