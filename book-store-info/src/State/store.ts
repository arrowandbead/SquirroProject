import { configureStore } from "@reduxjs/toolkit";
import bookStoreInfoSliceReducer from "./bookStoreInfoSlice";
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false
      }),
  reducer: {
    bookStoreInfo: bookStoreInfoSliceReducer

  }
});

export type AppDispatch = typeof store.dispatch;
