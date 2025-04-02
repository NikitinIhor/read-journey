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
      if (err.response?.status === 401) {
        return thunkAPI.rejectWithValue("Unauthorized");
      }
      if (err.response?.status === 404) {
        return thunkAPI.rejectWithValue("Not found");
      }

      return thunkAPI.rejectWithValue(
        "Server error... please reload the page."
      );
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
      if (err.response?.status === 409) {
        return thunkAPI.rejectWithValue("Such book already exists");
      }

      return thunkAPI.rejectWithValue(
        "Server error... please reload the page."
      );
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id: string, thunkAPI) => {
    try {
      const res = await axios.delete(`/books/remove/${id}`);
      return res.data.id;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        return thunkAPI.rejectWithValue("This book not found");
      }
      if (err.response?.status === 404) {
        return thunkAPI.rejectWithValue("Service not found");
      }
      return thunkAPI.rejectWithValue(
        "Server error... please reload the page."
      );
    }
  }
);

export const getBookInfo = createAsyncThunk(
  "books/getBook",
  async (id: string, thunkAPI) => {
    try {
      const res = await axios.get(`/books/${id}`);
      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 404) {
        return thunkAPI.rejectWithValue("Book is not found");
      }
      return thunkAPI.rejectWithValue(
        "Server error... please reload the page."
      );
    }
  }
);
