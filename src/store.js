import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./services/bookStoreApi";
import bookReducer from "./features/bookSlice";

export const store = configureStore({
    reducer: {
        [bookApi.reducerPath]: bookApi.reducer,
        books: bookReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookApi.middleware),
})