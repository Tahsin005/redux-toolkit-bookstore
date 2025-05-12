import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentBook: null,
    error: null,
};

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        clearCurrentBook: (state) => {
            state.currentBook = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        setCurrentBook: (state, action) => {
            state.currentBook = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export default bookSlice.reducer;
export const { clearCurrentBook, clearError, setCurrentBook, setError } = bookSlice.actions;