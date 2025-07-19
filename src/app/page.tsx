// src/app/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  description: string;
};

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch books
  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  // Delete book
  const handleDelete = async (id: string) => {
    const confirmed = confirm('Yakin ingin menghapus buku ini?');
    if (!confirmed) return;

    const res = await fetch(`/api/books/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setBooks(books.filter((b) => b.id !== id));
    }
  };

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Buku</h1>
        <Link
          href="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tambah Buku
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p>Tidak ada buku.</p>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-600">
                {book.author} • {book.genre} • {book.year}
              </p>
              <p className="mt-2">{book.description}</p>
              <div className="mt-4 flex gap-4">
                <Link
                  href={`/edit/${book.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(book.id)}
                  className="text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}