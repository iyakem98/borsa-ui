// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from "../features/auth/authSlice";
import chatReducer from "../features/chat/chatSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import messageReducer from "../features/message/messageSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  mess: messageReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export let persistor = persistStore(store);
