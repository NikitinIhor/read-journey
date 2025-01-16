import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { store } from "../store";
import { refresh, signin, signout, signup } from "./ops";

export type RootState = ReturnType<typeof store.getState>;

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: boolean;
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: false,
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        signup.fulfilled,
        (
          state,
          action: PayloadAction<{ name: string; email: string; token: string }>
        ) => {
          state.loading = false;
          state.error = false;
          state.user = {
            name: action.payload.name,
            email: action.payload.email,
            password: "",
          };
          state.token = action.payload.token;
          state.isLoggedIn = true;
        }
      )
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = true;

        if (action.error.message?.includes("409")) {
          toast.error("Such email already exists.");
        } else if (action.error.message?.includes("400")) {
          toast.error("Bad request (invalid request body).");
        } else if (action.error.message?.includes("500")) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error("An unknown error occurred.");
        }
      })
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        signin.fulfilled,
        (
          state,
          action: PayloadAction<{ name: string; email: string; token: string }>
        ) => {
          state.loading = false;
          state.error = false;
          state.user = {
            name: action.payload.name,
            email: action.payload.email,
            password: "",
          };
          state.token = action.payload.token;
          state.isLoggedIn = true;
        }
      )
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = true;

        if (action.error.message?.includes("401")) {
          toast.error("Email or password invalid.");
        } else if (action.error.message?.includes("400")) {
          toast.error("Bad request (invalid request body).");
        } else if (action.error.message?.includes("500")) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error("An unknown error occurred.");
        }
      })
      .addCase(signout.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(signout.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        state.token = null;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(signout.rejected, (state, action) => {
        state.loading = false;
        state.error = true;

        if (action.error.message?.includes("401")) {
          toast.error("Unauthorized.");
        } else if (action.error.message?.includes("500")) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error("An unknown error occurred.");
        }
      })
      .addCase(refresh.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        refresh.fulfilled,
        (state, action: PayloadAction<{ user: User }>) => {
          state.loading = false;
          state.error = false;
          state.isLoggedIn = true;
          state.user = action.payload.user;
        }
      )
      .addCase(refresh.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.isLoggedIn = false;
        state.token = null;
        state.user = null;

        if (action.error.message?.includes("401")) {
          toast.error("Unauthorized. Please login again.");
        } else if (action.error.message?.includes("500")) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error("An unknown error occurred.");
        }
      });
  },
});

export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
