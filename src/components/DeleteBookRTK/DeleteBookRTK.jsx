import React from 'react';
import { useDispatch } from 'react-redux';
import { useDeleteBookMutation } from '../../services/bookStoreApi';
import { setError } from '../../features/bookSlice';

const DeleteBookRTK = ({ isbn, disabled }) => {
    const dispatch = useDispatch();
    const [deleteBook, { isLoading }] = useDeleteBookMutation();

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (!confirmDelete) return;

        try {
            await deleteBook(isbn).unwrap();
        } catch (error) {
            dispatch(setError(error.data || error.message));
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isLoading || disabled}
            className={`px-3 py-1 rounded text-white ${isLoading || disabled
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600'
                }`}
        >
            {isLoading ? "Deleting..." : "Delete"}
        </button>
    );
};


export default DeleteBookRTK;
