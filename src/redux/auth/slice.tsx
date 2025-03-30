import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "../store";
import { refresh, signin, signout, signup } from "./ops";

export type RootState = ReturnType<typeof store.getState>;

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signup.fulfilled,
        (
          state,
          action: PayloadAction<{ name: string; email: string; token: string }>
        ) => {
          state.loading = false;
          state.error = null;
          state.user = {
            name: action.payload.name,
            email: action.payload.email,
          };
          state.token = action.payload.token;
          state.isLoggedIn = true;
        }
      )
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signin.fulfilled,
        (
          state,
          action: PayloadAction<{ name: string; email: string; token: string }>
        ) => {
          state.loading = false;
          state.error = null;
          state.user = {
            name: action.payload.name,
            email: action.payload.email,
          };
          state.token = action.payload.token;
          state.isLoggedIn = true;
        }
      )
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signout.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.token = null;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(signout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(refresh.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(
        refresh.fulfilled,
        (
          state,
          action: PayloadAction<{ name: string; email: string; token: string }>
        ) => {
          state.loading = false;
          state.error = null;
          state.isLoggedIn = true;
          state.isRefreshing = false;
          state.user = {
            name: action.payload.name,
            email: action.payload.email,
          };
          state.token = action.payload.token;
        }
      )
      .addCase(refresh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.token = null;
        state.user = null;
      });
  },
});

export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;

export default authSlice.reducer;
