import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetBookByIsbnQuery } from '../../services/bookStoreApi';
import { setCurrentBook } from '../../features/bookSlice';

const BookByIsbnRTK = ({ isbn, clearIsbn }) => {
    const dispatch = useDispatch();
    const { data: book, isLoading, error } = useGetBookByIsbnQuery(isbn);

    useEffect(() => {
        if (book) {
            dispatch(setCurrentBook(book));
        }
    }, [book, dispatch]);

    if (isLoading) return <div className="text-blue-500 text-center py-4">Loading book details...</div>;
    if (error) return <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded mb-4">⚠️ Error: {error.data || error.message}</div>;

    return (
        <div className="relative max-w-md mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
            <button
                onClick={clearIsbn}
                className="absolute top-2 right-2 text-sm text-red-600 hover:underline"
            >
                ✖
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{book.title}</h2>
            <p className="text-gray-700 mb-1"><strong>Author:</strong> {book.author}</p>
            <p className="text-sm text-gray-500"><strong>ISBN:</strong> {book.isbn}</p>
        </div>
    );
};

export default BookByIsbnRTK;
