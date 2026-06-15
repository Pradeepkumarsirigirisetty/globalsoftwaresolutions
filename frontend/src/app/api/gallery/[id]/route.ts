export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-helper';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    verifyAuth(req);
    const { id: idStr } = await params;
    const id = parseInt(idStr);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid gallery image ID' }, { status: 400 });
    }

    await prisma.gallery.delete({ where: { id } });
    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error: any) {
    console.error('Error in DELETE /api/gallery/[id]:', error);
    if (error.message === 'Access token required' || error.message === 'Invalid or expired token') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'Access token required' ? 401 : 403 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
