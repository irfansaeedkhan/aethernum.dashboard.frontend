import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  if (!searchParams.get('userId') || !searchParams.get('bucketId')) {
    return NextResponse.json({ error: 'Missing userId or bucketId parameter' }, { status: 400 });
  }

  const now = Date.now();
  return NextResponse.json(
    Array.from({ length: 12 }, (_, index) => ({
      timestamp: new Date(now - (11 - index) * 60 * 60 * 1000).toISOString(),
      value: 62 + Math.sin(index / 2) * 8 + index / 4,
    }))
  );
}
