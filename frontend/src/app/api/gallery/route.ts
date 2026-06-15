export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-helper';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    const where: any = {};
    if (category && category !== 'all') {
      where.category = category;
    }

    const images = await prisma.gallery.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error in GET /api/gallery:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    verifyAuth(req);
    const { title, imageUrl, category } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL required' }, { status: 400 });
    }

    const image = await prisma.gallery.create({
      data: {
        title,
        imageUrl,
        category: category || 'general'
      }
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/gallery:', error);
    if (error.message === 'Access token required' || error.message === 'Invalid or expired token') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'Access token required' ? 401 : 403 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
