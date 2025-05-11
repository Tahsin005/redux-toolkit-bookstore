import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBookByIsbn } from '../../features/books/bookSlice';

const BookDetails = ({ isbn }) => {
    const { currentBook, loading, error } = useSelector((state) => state.books);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isbn) {
            dispatch(fetchBookByIsbn(isbn));
        }
    }, [isbn, dispatch]);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                📖 Book Details
            </h2>

            {loading && (
                <div className="text-blue-500 animate-pulse text-lg font-medium">
                    Fetching book data...
                </div>
            )}

            {error && (
                <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded mb-4">
                    ⚠️ {error}
                    <button
                        className="ml-2 text-blue-600"
                        onClick={() => dispatch(clearError())}
                    >
                        Clear
                    </button>
                </div>
            )}

            {currentBook ? (
                <div className="bg-white p-6 rounded-lg shadow-md border space-y-4">
                    <p><span className="font-semibold text-gray-700">📚 ISBN:</span> {currentBook.isbn}</p>
                    <p><span className="font-semibold text-gray-700">📕 Title:</span> {currentBook.title}</p>
                    <p><span className="font-semibold text-gray-700">✍️ Author:</span> {currentBook.author}</p>
                </div>
            ) : (
                !loading && !error && (
                    <div className="text-gray-500 italic mt-4">No book selected.</div>
                )
            )}
        </div>
    );
};

export default BookDetails;
