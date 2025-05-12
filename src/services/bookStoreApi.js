import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const axiosBaseQuery = ({ baseUrl } = { baseUrl: "" }) => async ({
    url,
    method,
    data,
    params,
}) => {
    try {
        const result = await axios({
            url: baseUrl + url,
            method,
            data,
            params,
        });

        return { data: result.data }
    } catch (axiosError) {
        const err = axiosError;
        return {
            error: {
                status: err.response?.status,
                data: err.response?.data || err.message,
            }
        }
    }
};

export const bookApi = createApi({
    reducerPath: "bookApi",
    baseQuery: axiosBaseQuery({
        baseUrl: API_BASE_URL,
    }),
    tagTypes: ["Books"], // for cache invalidation
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => ({
                url: "/books/all",
                method: "GET",
            }),
            providesTags: ["Books"],
        }),

        getBookByIsbn: builder.query({
            query: (isbn) => ({
                url: `/books/${isbn}`,
                method: "GET",
            }),
            providesTags: (result, error, isbn) => [{ type: "Books", id: isbn }],
        }),

        addBook: builder.mutation({
            query: (book) => ({
                url: "/books/new",
                method: "POST",
                data: book,
            }),
            invalidatesTags: ["Books"],
        }),

        updateBook: builder.mutation({
            query: ({ isbn, book }) => ({
                url: `/books/update/${isbn}`,
                method: "PUT",
                data: book,
            }),
            invalidatesTags: (result, error, { isbn }) => [
                "Books",
                { type: "Books", id: isbn },
            ],
        }),

        deleteBook: builder.mutation({
            query: (isbn) => ({
                url: `/books/delete/${isbn}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Books"],
        })
    })
});

export const {
    useGetBooksQuery,
    useGetBookByIsbnQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
} = bookApi;