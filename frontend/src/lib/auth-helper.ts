import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export interface DecodedToken {
  id: number;
  email: string;
  role: string;
}

export function verifyAuth(req: Request | NextRequest): DecodedToken {
  const authHeader = req.headers.get('authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new Error('Access token required');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    return decoded;
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}
