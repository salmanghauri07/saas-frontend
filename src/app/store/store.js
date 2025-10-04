import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root", // key in storage
  storage, // default: localStorage
  whitelist: ["auth"], // which slices to persist
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // to ignore non-serializable values like Promises
    }),
});

export const persistor = persistStore(store);
