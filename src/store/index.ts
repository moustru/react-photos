import { configureStore } from "@reduxjs/toolkit";
import { photosApi } from "./api/photosApi";

export const store = configureStore({
  reducer: {
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(photosApi.middleware),
});
