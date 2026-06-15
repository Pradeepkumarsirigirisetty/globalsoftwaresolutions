import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-helper';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const active = searchParams.get('active');

    const where: any = {};
    if (category && category !== 'All') {
      where.category = category;
    }
    if (active !== null) {
      where.isActive = active === 'true';
    }

    const courses = await prisma.course.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error in GET /api/courses:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Authenticate admin
    verifyAuth(req);

    const { name, category, description, duration, level, imageUrl, syllabus, careerPaths, eligibility } = await req.json();

    if (!name || !category || !description || !duration) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const existing = await prisma.course.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    const course = await prisma.course.create({
      data: {
        name,
        slug: finalSlug,
        category,
        description,
        duration,
        level: level || 'Beginner',
        imageUrl,
        syllabus: syllabus || [],
        careerPaths: careerPaths || [],
        eligibility
      }
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/courses:', error);
    if (error.message === 'Access token required' || error.message === 'Invalid or expired token') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'Access token required' ? 401 : 403 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
