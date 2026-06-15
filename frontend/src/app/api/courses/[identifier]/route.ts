import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-helper';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ identifier: string }> }
) {
  try {
    const { identifier } = await params;
    const isNumeric = /^\d+$/.test(identifier);

    const course = await prisma.course.findUnique({
      where: isNumeric
        ? { id: parseInt(identifier) }
        : { slug: identifier }
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error('Error in GET /api/courses/[identifier]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ identifier: string }> }
) {
  try {
    verifyAuth(req);
    const { identifier } = await params;
    const id = parseInt(identifier);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid course ID' }, { status: 400 });
    }

    const body = await req.json();

    const course = await prisma.course.update({
      where: { id },
      data: body
    });

    return NextResponse.json(course);
  } catch (error: any) {
    console.error('Error in PUT /api/courses/[identifier]:', error);
    if (error.message === 'Access token required' || error.message === 'Invalid or expired token') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'Access token required' ? 401 : 403 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ identifier: string }> }
) {
  try {
    verifyAuth(req);
    const { identifier } = await params;
    const id = parseInt(identifier);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid course ID' }, { status: 400 });
    }

    // Check if there are student applications linked to this course
    const admissionsCount = await prisma.admission.count({
      where: { courseId: id }
    });

    if (admissionsCount > 0) {
      return NextResponse.json(
        {
          error:
            'Cannot delete this course because there are students enrolled in it. Please delete the student applications first.'
        },
        { status: 400 }
      );
    }

    await prisma.course.delete({ where: { id } });
    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error: any) {
    console.error('Error in DELETE /api/courses/[identifier]:', error);
    if (error.message === 'Access token required' || error.message === 'Invalid or expired token') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'Access token required' ? 401 : 403 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
