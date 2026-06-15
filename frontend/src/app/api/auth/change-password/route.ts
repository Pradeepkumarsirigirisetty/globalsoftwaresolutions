import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-helper';

export async function PUT(req: Request) {
  try {
    const decoded = verifyAuth(req);
    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Current password and new password are required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashed }
    });

    return NextResponse.json({ message: 'Password changed successfully' });
  } catch (error: any) {
    console.error('Error in PUT /api/auth/change-password:', error);
    const status = error.message === 'Access token required' ? 401 : 403;
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status });
  }
}
