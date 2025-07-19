'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditBookPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [form, setForm] = useState({
    title: '',
    author: '',
    year: '',
    genre: '',
    description: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/books/${id}`);
      const book = await res.json();
      setForm({
        title: book.title,
        author: book.author,
        year: book.year.toString(),
        genre: book.genre,
        description: book.description,
      });
      setLoading(false);
    };
    if (id) fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, year: Number(form.year) }),
    });
    router.push('/');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border" />
        <input name="author" value={form.author} onChange={handleChange} placeholder="Author" className="w-full p-2 border" />
        <input name="year" value={form.year} onChange={handleChange} placeholder="Year" type="number" className="w-full p-2 border" />
        <input name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" className="w-full p-2 border" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border" />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">Update</button>
      </form>
    </div>
  );
}
