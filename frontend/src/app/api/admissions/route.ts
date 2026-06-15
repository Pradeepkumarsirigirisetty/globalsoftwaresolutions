export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-helper';

export async function GET(req: Request) {
  try {
    // Authenticate admin
    verifyAuth(req);

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');
    const status = searchParams.get('status');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '20';

    const where: any = {};
    if (courseId) {
      where.courseId = parseInt(courseId);
    }
    if (status) {
      where.status = status;
    }
    if (from || to) {
      where.createdAt = {};
      if (from) where.createdAt.gte = new Date(from);
      if (to) where.createdAt.lte = new Date(to);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [admissions, total] = await Promise.all([
      prisma.admission.findMany({
        where,
        include: { course: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.admission.count({ where })
    ]);

    return NextResponse.json({
      admissions,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error: any) {
    console.error('Error in GET /api/admissions:', error);
    if (error.message === 'Access token required' || error.message === 'Invalid or expired token') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'Access token required' ? 401 : 403 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { fullName, mobile, email, dob, qualification, address, courseId, preferredBatch, photoUrl } = await req.json();

    if (!fullName || !mobile || !dob || !qualification || !address || !courseId || !preferredBatch) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
    }

    const admission = await prisma.admission.create({
      data: {
        fullName,
        mobile,
        email,
        dob,
        qualification,
        address,
        courseId: parseInt(courseId),
        preferredBatch,
        photoUrl
      },
      include: { course: { select: { name: true } } }
    });

    return NextResponse.json(
      { message: 'Application submitted successfully!', admission },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/admissions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
