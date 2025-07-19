// src/app/api/books/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // ⬅️ pakai import dari lib

// GET: /api/books
export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}

// POST: /api/books
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, author, year, genre, description } = body;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        year: Number(year),
        genre,
        description,
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}
