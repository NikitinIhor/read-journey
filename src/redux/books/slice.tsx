import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "../store";
import { addBook, deleteBook, getAllBooks } from "./ops";

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
  error: string | null;
  books: Books[];
  library: Books[];
}

const initialState: BooksState = {
  loading: false,
  error: null,
  books: [],
  library: [],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllBooks.fulfilled,
        (state, action: PayloadAction<Books[]>) => {
          state.loading = false;
          state.error = null;
          state.books = action.payload;
        }
      )
      .addCase(getAllBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action: PayloadAction<Books>) => {
        state.loading = false;
        state.error = null;
        state.library.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = null;

        state.library = state.library.filter(
          (book) => book._id !== action.payload
        );
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectBooks = (state: RootState) => state.books.books;
export const selectLibrary = (state: RootState) => state.books.library;
export const selectLoading = (state: RootState) => state.books.loading;
export const selectError = (state: RootState) => state.books.error;

export default booksSlice.reducer;
