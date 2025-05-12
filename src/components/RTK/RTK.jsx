import React from 'react';
import BookListRTK from '../BookListRTK/BookListRTK';
import AddBookRTK from '../AddBookRTK/AddBookRTK';

const RTK = () => {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 p-6 space-y-8">
            <header className="text-center">
                <h1 className="text-3xl font-bold text-blue-900">📚 RTK Book Manager</h1>
                <p className="text-sm text-gray-600 mt-1">Using Redux Toolkit Query</p>
            </header>

            <section>
                <AddBookRTK />
            </section>

            <section className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <BookListRTK />
            </section>
        </div>
    );
};

export default RTK;
