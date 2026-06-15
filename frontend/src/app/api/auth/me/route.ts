export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-helper';

export async function GET(req: Request) {
  try {
    const decoded = verifyAuth(req);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    console.error('Error in GET /api/auth/me:', error);
    const status = error.message === 'Access token required' ? 401 : 403;
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status });
  }
}
