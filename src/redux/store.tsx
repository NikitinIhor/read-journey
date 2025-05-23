import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/slice";
import booksReducer from "./books/slice";
import filtersReducer from "./filters/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "user", "isLoggedIn", "library"],
};

const booksPersistConfig = {
  key: "books",
  storage,
  whitelist: ["library"],
};

const persistedReducer = persistReducer(authPersistConfig, authReducer);
const persistedBooksReducer = persistReducer(booksPersistConfig, booksReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    books: persistedBooksReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
