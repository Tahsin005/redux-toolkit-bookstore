import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAddBookMutation } from '../../services/bookStoreApi';
import { setError } from '../../features/bookSlice';
import toast from 'react-hot-toast';

const AddBookRTK = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [addBook, { isLoading }] = useAddBookMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addBook({ isbn, title, author }).unwrap();
            toast.success('📘 Book added successfully!');
            setTitle('');
            setAuthor('');
            setIsbn('');
        } catch (error) {
            dispatch(setError(error.data || error.message));
            toast.error('❌ Failed to add book');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4 max-w-md mx-auto"
        >
            <h2 className="text-xl font-semibold text-blue-900">➕ Add New Book</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="ISBN"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-md text-white font-semibold ${isLoading
                        ? 'bg-blue-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
            >
                {isLoading ? 'Adding...' : 'Add Book'}
            </button>
        </form>
    );
};

export default AddBookRTK;
