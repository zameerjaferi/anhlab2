import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/app/lib/auth';
import path from 'path';
import fs from 'fs/promises';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string; reportId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const userId = params.userId;
  const reportId = parseInt(params.reportId);

  if (session.user?.labId!.toString() !== userId) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  try {
    const filePath = path.join(process.cwd(), 'file', `${userId}`, `${reportId}.pdf`);
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Disposition': `attachment; filename="${reportId}.pdf"`,
        'Content-Type': 'application/pdf',
      },
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    return new NextResponse('File not found', { status: 404 });
  }
}