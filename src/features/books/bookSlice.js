import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";


// async thunks for API calls

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
    const response = await axios.get(`${API_BASE_URL}/books/all`);
    return response.data;
});

export const fetchBookByIsbn = createAsyncThunk("books/fetchBookByIsbn", async (isbn) => {
    const response = await axios.get(`${API_BASE_URL}/books/${isbn}`);
    return response.data;
});

export const addBook = createAsyncThunk("books/addBook", async (book, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/books/new`, book);
        console.log('Boi add korte ashsi..')
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
});

export const updateBook = createAsyncThunk("book/updateBook", async ({ isbn, book }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/books/update/${isbn}`, book);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteBook = createAsyncThunk('books/deleteBook', async (isbn, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/books/delete/${isbn}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    books: [],
    currentBook: null,
    loading: false,
    error: null,
}

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        clearCurrentBook: (state) => {
            state.currentBook = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch all books
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // fetch book by isbn
            .addCase(fetchBookByIsbn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookByIsbn.fulfilled, (state, action) => {
                state.loading = false;
                state.currentBook = action.payload;
            })
            .addCase(fetchBookByIsbn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // add book
            .addCase(addBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books.push({
                    isbn: action.payload.isbn,
                    title: action.meta.arg.title,
                    author: action.meta.arg.author,
                });
            })
            .addCase(addBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // update book
            .addCase(updateBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.books.findIndex((book) => book.isbn === action.payload.isbn);
                if (index !== -1) {
                    state.books[index] = {
                        isbn: action.payload.isbn,
                        title: action.payload.title,
                        author: action.payload.author,
                    };
                }
            })
            .addCase(updateBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // delete book
            .addCase(deleteBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books = state.books.filter((book) => book.isbn !== action.payload.isbn);
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    }
});

export const { clearCurrentBook, clearError } = bookSlice.actions;
export default bookSlice.reducer;