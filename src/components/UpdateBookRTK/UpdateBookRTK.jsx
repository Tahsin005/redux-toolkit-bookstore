import React, { useState } from 'react';
import { useUpdateBookMutation } from '../../services/bookStoreApi';
import { useDispatch } from 'react-redux';
import { setError } from '../../features/bookSlice';
import toast from 'react-hot-toast';

const UpdateBookRTK = ({ book }) => {
    const [updateBook, { isLoading }] = useUpdateBookMutation();
    const dispatch = useDispatch();
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBook({ isbn: book.isbn, book: { title, author } }).unwrap();
            toast.success('📘 Book updated successfully!');
        } catch (error) {
            dispatch(setError(error.data || error.message));
            toast.error('❌ Failed to update book.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4"
        >
            <h2 className="text-xl font-semibold text-blue-900">✏️ Update Book</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
                {isLoading ? 'Updating...' : 'Update Book'}
            </button>
        </form>
    );
};

export default UpdateBookRTK;
