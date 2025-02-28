import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api";

export const getAllBooks = createAsyncThunk(
  "books/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("books/recommended");
      return res;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
