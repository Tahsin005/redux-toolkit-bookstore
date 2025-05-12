import React, { useState } from 'react';
import { useGetBooksQuery } from '../../services/bookStoreApi';
import BookByIsbnRTK from '../BookByIsbnRTK/BookByIsbnRTK';
import { useDispatch, useSelector } from 'react-redux';
import UpdateBookRTK from '../UpdateBookRTK/UpdateBookRTK';
import DeleteBookRTK from '../DeleteBookRTK/DeleteBookRTK';
import { setCurrentBook } from '../../features/bookSlice';

const BookListRTK = () => {
    const { data: books, isLoading, error } = useGetBooksQuery();
    const [currentIsbn, setCurrentIsbn] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const { currentBook, error: err } = useSelector((state) => state.books);
    const dispatch = useDispatch();

    if (isLoading) {
        return <div className="text-center text-blue-500 font-medium py-6">📚 Loading books...</div>;
    }

    if (error) {
        return (
            <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded mx-auto max-w-md my-6">
                ⚠️ Error: {error.data || error.message}
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row gap-8 p-6">
                <div className="w-full md:w-2/3 bg-white shadow-md rounded-lg border border-gray-200 p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">📖 Book List (RTK Query)</h2>
                    <ul className="space-y-4">
                        {!books && <div>No Books Found...</div>}
                        {books && books.map((book) => (
                            <li
                                key={book.isbn}
                                className={`p-4 border rounded-md transition flex justify-between items-center ${currentIsbn === book.isbn
                                    ? 'bg-blue-100 border-blue-400 shadow-inner'
                                    : 'bg-gray-50 border-gray-200 shadow-sm hover:shadow-md'
                                    }`}
                            >
                                <div className="flex-1">
                                    <p className="text-lg font-semibold text-blue-800">{book.title}</p>
                                    <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setCurrentIsbn(book.isbn)}
                                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowUpdateForm(true);
                                            dispatch(setCurrentBook(book));
                                        }}
                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                    >
                                        Update
                                    </button>
                                    <DeleteBookRTK isbn={book.isbn} disabled={currentIsbn !== null || showUpdateForm} />
                                </div>

                            </li>
                        ))}
                    </ul>
                </div>

                {showUpdateForm && currentBook && (
                    <div className="w-full md:w-1/3">
                        <UpdateBookRTK book={currentBook} />
                        <div className="ps-5">
                            <button
                                onClick={() => setShowUpdateForm(false)}
                                className="mt-4 text-sm text-red-600 hover:underline"
                            >
                                ✖ Close Update Form
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-12 pb-6 max-w-3xl mx-auto">
                {currentIsbn && <BookByIsbnRTK
                    isbn={currentIsbn}
                    clearIsbn={() => setCurrentIsbn(null)}
                />}
            </div>
        </div>
    );
};

export default BookListRTK;
