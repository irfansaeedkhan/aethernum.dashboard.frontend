import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  if (!searchParams.get('userId') || !searchParams.get('bucketId')) {
    return NextResponse.json({ error: 'Missing userId or bucketId parameter' }, { status: 400 });
  }

  const now = Date.now();

  const points = Array.from({ length: 24 }, (_, index) => {
    const ts = new Date(now - (23 - index) * 60 * 60 * 1000).getTime();
    const dayFactor = 60 + Math.floor(Math.sin(index / 3) * 30) + index;
    return {
      ts,
      val: {
        'A-timeStamp': ts,
        'B-date': new Date(ts).toISOString().slice(0, 10),
        'C-time': new Date(ts).toISOString().slice(11, 19),
        'D-minerId': 'Miner_153F407D',
        'E-actDateTime': new Date(ts).toISOString(),
        'F-buyerId': 'ClayCas',
        'G-buyerPW': 'demo-user',
        'H-sellerId': 'aetherum',
        'I-officeType': 'Large Sigillum',
        'L-trxNumber': 2340 + index * 37,
        'M-dayTransNumber': 410 + index * 5,
        'N-hourTransNumber': 28 + (index % 7),
        'O-trxToken': `trx-${ts}`,
        'P-totalSale': 88250 + index * 532,
        'Q-revIncome': 22130 + index * 128,
        'R-daySale': 5240 + index * 87,
        'S-dayRevIncome': 1310 + index * 22,
        'T-hourSale': 780 + index * 12,
        'U-hourRevIncome': 195 + index * 3,
        'V-trxSec': Number((2.4 + Math.abs(Math.sin(index / 4)) * 2).toFixed(2)),
        'Z-mAh': 480 + Math.floor(Math.sin(index / 2) * 90) + index * 3,
      },
    };
  });

  return NextResponse.json(points);
}