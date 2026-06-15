import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-helper';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    verifyAuth(req);
    const { id: idStr } = await params;
    const id = parseInt(idStr);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid admission ID' }, { status: 400 });
    }

    const admission = await prisma.admission.findUnique({
      where: { id },
      include: { course: true }
    });

    if (!admission) {
      return NextResponse.json({ error: 'Admission not found' }, { status: 404 });
    }

    return NextResponse.json(admission);
  } catch (error: any) {
    console.error('Error in GET /api/admissions/[id]:', error);
    if (error.message === 'Access token required' || error.message === 'Invalid or expired token') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'Access token required' ? 401 : 403 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    verifyAuth(req);
    const { id: idStr } = await params;
    const id = parseInt(idStr);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid admission ID' }, { status: 400 });
    }

    await prisma.admission.delete({ where: { id } });
    return NextResponse.json({ message: 'Admission deleted successfully' });
  } catch (error: any) {
    console.error('Error in DELETE /api/admissions/[id]:', error);
    if (error.message === 'Access token required' || error.message === 'Invalid or expired token') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'Access token required' ? 401 : 403 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
