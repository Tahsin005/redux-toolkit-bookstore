import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, updateBook } from "../../features/books/bookSlice";

const BookForm = ({ bookToEdit, onCancelEdit }) => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.books);

    const [formData, setFormData] = useState({
        isbn: '',
        title: '',
        author: '',
    });

    useEffect(() => {
        if (bookToEdit) {
            setFormData({
                isbn: bookToEdit.isbn,
                title: bookToEdit.title,
                author: bookToEdit.author,
            });
        }
    }, [bookToEdit]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (bookToEdit) {
            dispatch(updateBook({
                isbn: formData.isbn,
                book: formData
            }))
        } else {
            dispatch(addBook(formData));
        }
        setFormData({ isbn: '', title: '', author: '' });
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">{bookToEdit ? 'Update Book' : 'Add New Book'}</h2>
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
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
                <div className="mb-4">
                    <label className="block text-gray-700">ISBN</label>
                    <input
                        type="text"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                        disabled={!!bookToEdit} // disable when updating
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : bookToEdit ? 'Update' : 'Add'}
                    </button>
                    {bookToEdit && (
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                            onClick={onCancelEdit}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default BookForm;