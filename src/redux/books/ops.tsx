import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api";

export const getAllBooks = createAsyncThunk(
  "books/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/books/recommend?limit=100");
      return res.data.results;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async (id: string, thunkAPI) => {
    try {
      const res = await axios.post(`/books/add/${id}`);
      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id: string, thunkAPI) => {
    try {
      const res = await axios.delete(`/books/remove/${id}`);
      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
