import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "../store";

export type RootState = ReturnType<typeof store.getState>;

interface FilterState {
  title: string;
  author: string;
  totalPages: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: FilterState = {
  loading: false,
  error: null,
  title: "",
  author: "",
  totalPages: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filterByTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    filterByAuthor(state, action: PayloadAction<string>) {
      state.author = action.payload;
    },
    filterByPages(state, action: PayloadAction<number | null>) {
      state.totalPages = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const selectFilterLoading = (state: RootState) => state.filters.loading;
export const selectFilterError = (state: RootState) => state.filters.error;

export const selectFilterByTitle = (state: RootState) => state.filters.title;
export const selectFilterByAuthor = (state: RootState) => state.filters.author;
export const selectFilterByAPages = (state: RootState) =>
  state.filters.totalPages;

export const {
  filterByTitle,
  filterByAuthor,
  filterByPages,
  setLoading,
  setError,
  clearError,
} = filtersSlice.actions;

export default filtersSlice.reducer;
