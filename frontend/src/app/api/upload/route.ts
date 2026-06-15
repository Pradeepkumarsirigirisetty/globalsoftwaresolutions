import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth-helper';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(req: Request) {
  try {
    // Authenticate admin
    verifyAuth(req);

    const { searchParams } = new URL(req.url);
    const folder = searchParams.get('folder') || 'general';

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const url = await uploadToCloudinary(buffer, folder);

    return NextResponse.json({ url });
  } catch (error: any) {
    console.error('Error in POST /api/upload:', error);
    if (error.message === 'Access token required' || error.message === 'Invalid or expired token') {
      return NextResponse.json({ error: error.message }, { status: error.message === 'Access token required' ? 401 : 403 });
    }
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
