import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-helper';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');

    if (key) {
      const content = await prisma.siteContent.findUnique({ where: { key } });
      return NextResponse.json(content);
    }

    const contents = await prisma.siteContent.findMany();
    const result: Record<string, string> = {};
    contents.forEach(c => {
      result[c.key] = c.value;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in GET /api/content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    verifyAuth(req);
    const updates = (await req.json()) as Record<string, string>;

    const promises = Object.entries(updates).map(([key, value]) =>
      prisma.siteContent.upsert({
        where: { key },
        create: { key, value },
        update: { value }
      })
    );

    await Promise.all(promises);
    return NextResponse.json({ message: 'Content updated successfully' });
  } catch (error: any) {
    console.error('Error in PUT /api/content:', error);
    if (error.message === 'Access token required' || error.message === 'Invalid or expired token') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'Access token required' ? 401 : 403 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
