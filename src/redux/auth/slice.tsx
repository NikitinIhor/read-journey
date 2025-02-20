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
  error: boolean;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: false,
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
          };
          state.token = action.payload.token;
          state.isLoggedIn = true;
        }
      )
      .addCase(signup.rejected, (state) => {
        state.loading = false;
        state.error = true;
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
          };
          state.token = action.payload.token;
          state.isLoggedIn = true;
        }
      )
      .addCase(signin.rejected, (state) => {
        state.loading = false;
        state.error = true;
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
      .addCase(signout.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(refresh.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.isRefreshing = true;
      })
      .addCase(
        refresh.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.loading = false;
          state.error = false;
          state.isLoggedIn = true;
          state.isRefreshing = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(refresh.rejected, (state) => {
        state.loading = false;
        state.error = true;
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
