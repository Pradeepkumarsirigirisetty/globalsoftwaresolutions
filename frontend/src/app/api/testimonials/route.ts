export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-helper';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get('all');

    const where = all === 'true' ? {} : { isActive: true };

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error in GET /api/testimonials:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    verifyAuth(req);
    const { name, course, message, rating, photoUrl } = await req.json();

    if (!name || !course || !message) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        course,
        message,
        rating: rating || 5,
        photoUrl
      }
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/testimonials:', error);
    if (error.message === 'Access token required' || error.message === 'Invalid or expired token') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'Access token required' ? 401 : 403 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
