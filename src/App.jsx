import React, { useState } from 'react';
import BookList from './components/BookList/BookList';
import BookDetails from './components/BookDetails/BookDetails';
import BookForm from './components/BookForm/BookForm';
import { Toaster } from 'react-hot-toast';
import RTK from './components/RTK/RTK';

function App() {
  const [selectedIsbn, setSelectedIsbn] = useState(null);
  const [bookToEdit, setBookToEdit] = useState(null);

  const handleView = (isbn) => {
    setSelectedIsbn(isbn);
    setBookToEdit(null);
  };

  const handleCancelEdit = () => {
    setBookToEdit(null);
  };

  const handleUpdate = (book) => {
    setBookToEdit(book);
    setSelectedIsbn(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* <header className="bg-blue-950 text-white p-6 shadow">
        <h1 className="text-3xl font-bold text-center">📚 Bookstore Management</h1>
      </header> */}

      {/* <main className="flex flex-col-reverse xl:flex-row gap-6 p-6">
        <section className="xl:w-2/3 bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">📋 Book List</h2>
          <BookList onView={handleView} onUpdate={handleUpdate} />
        </section>

        <section className="xl:w-1/3 bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">🛠 Book Editor</h2>
          <BookForm bookToEdit={bookToEdit} onCancelEdit={handleCancelEdit} />
          <div className="mt-6">
            <BookDetails isbn={selectedIsbn} />
          </div>
        </section>
      </main> */}

      <div className=''>
        <RTK />
      </div>

      <Toaster />
    </div>
  );
}

export default App;
