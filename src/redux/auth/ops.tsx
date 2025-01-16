import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../store";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api";

const setAuthHeader = (token: string | null) => {
  axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : "";
};

interface SignupValues {
  name: string;
  email: string;
  password: string;
}
interface SigninValues {
  email: string;
  password: string;
}

export const signup = createAsyncThunk(
  "auth/signup",
  async (newUser: SignupValues, thunkAPI) => {
    try {
      const res = await axios.post("/users/signup", newUser);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (user: SigninValues, thunkAPI) => {
    try {
      const res = await axios.post("/users/signin", user);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const signout = createAsyncThunk("auth/signout", async (_, thunkApi) => {
  try {
    const res = await axios.post("/users/signout");
    setAuthHeader("");
  } catch (error) {
    const err = error as AxiosError;
    return thunkApi.rejectWithValue(err.message);
  }
});

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const persistedtToken = state.auth.token;
    try {
      setAuthHeader(persistedtToken);
      const res = await axios.get("/users/current/refresh");
      return res.data;
    } catch (error) {
      const err = error as AxiosError;
      return thunkApi.rejectWithValue(err.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;
      return state.auth.token !== null;
    },
  }
);
