import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-helper';

export async function PUT(
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

    const { status, notes } = await req.json();

    const admission = await prisma.admission.update({
      where: { id },
      data: { status, notes }
    });

    return NextResponse.json(admission);
  } catch (error: any) {
    console.error('Error in PUT /api/admissions/[id]/status:', error);
    if (error.message === 'Access token required' || error.message === 'Invalid or expired token') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'Access token required' ? 401 : 403 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
