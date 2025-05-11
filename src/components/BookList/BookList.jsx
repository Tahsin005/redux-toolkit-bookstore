import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, deleteBook, fetchBooks } from '../../features/books/bookSlice';
import toast from 'react-hot-toast';

const BookList = ({ onView, onUpdate }) => {
    const { books, loading, error } = useSelector((state) => state.books);
    const dispatch = useDispatch();
    const [generatedIsbn, setGeneratedIsbn] = useState('');

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    const handleDelete = (isbn) => {
        dispatch(deleteBook(isbn));
    };

    const generateIsbn = () => {
        const randomIsbn = Array.from({ length: 13 }, () => Math.floor(Math.random() * 10)).join('');
        setGeneratedIsbn(randomIsbn);
    };

    const copyToClipboard = () => {
        if (generatedIsbn) {
            navigator.clipboard.writeText(generatedIsbn);
            toast.success('ISBN copied to clipboard!');
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 Book List</h2>

            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={generateIsbn}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded shadow"
                >
                    Generate 13-digit ISBN
                </button>
                {generatedIsbn && (
                    <div className="flex items-center gap-2">
                        <span className="text-gray-800 font-mono bg-gray-100 px-3 py-1 rounded border">{generatedIsbn}</span>
                        <button
                            onClick={copyToClipboard}
                            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
                        >
                            Copy
                        </button>
                    </div>
                )}
            </div>

            {loading && (
                <div className="text-center text-blue-500 font-semibold">Loading books...</div>
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

            {!loading && books.length === 0 && (
                <div className="text-gray-600 text-center">No books found.</div>
            )}

            {books.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 shadow-sm rounded-md overflow-hidden">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left p-3 border-b">ISBN</th>
                                <th className="text-left p-3 border-b">Title</th>
                                <th className="text-left p-3 border-b">Author</th>
                                <th className="text-left p-3 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book.isbn} className="hover:bg-gray-50 transition">
                                    <td className="p-3 border-b text-sm text-gray-700">{book.isbn}</td>
                                    <td className="p-3 border-b font-medium text-gray-800">{book.title}</td>
                                    <td className="p-3 border-b text-gray-700">{book.author}</td>
                                    <td className="p-3 border-b">
                                        <div className="flex gap-2">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded shadow"
                                                onClick={() => onView(book.isbn)}
                                            >
                                                View
                                            </button>
                                            <button
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded shadow"
                                                onClick={() => onUpdate(book)}
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded shadow"
                                                onClick={() => handleDelete(book.isbn)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BookList;
