import { NextRequest, NextResponse } from 'next/server';
import {
  DEMO_PAGE_SIZE,
  demoUser,
  mockAffiliateReport,
  mockAffiliates,
  mockCardTransactions,
  mockDashboardTransactions,
  mockInvoices,
  mockLeaderboard,
  mockLevels,
  mockRewards,
  mockTransactions,
  paginate,
} from '@/lib/mock-data';

const tokenPayload = (isAdmin = false) =>
  Buffer.from(
    JSON.stringify({
      ...demoUser,
      is_admin: isAdmin,
      IsAdmin: isAdmin,
      iat: 1700000000,
      exp: 4102444800,
    }),
    'utf8'
  ).toString('base64url');

const token = (isAdmin = false) => `demo.${tokenPayload(isAdmin)}.local`;

function pageFrom(body: Record<string, unknown>, url: URL) {
  const fromBody = Number(body.Page ?? body.page ?? body.offset);
  const fromQuery = Number(url.searchParams.get('Page') ?? url.searchParams.get('page') ?? 1);
  if (Number.isFinite(fromBody) && fromBody > 0) {
    // support offset-style (0-based) by treating large offsets carefully — Page is 1-based
    return Math.max(1, Math.floor(fromBody));
  }
  return Math.max(1, Number.isFinite(fromQuery) ? fromQuery : 1);
}

function responseFor(
  path: string,
  method: string,
  body: Record<string, unknown> = {},
  url: URL
) {
  const page = pageFrom(body, url);
  const statusFilter = String(url.searchParams.get('status') || body.status || 'ALL').toUpperCase();

  if (path === 'auth/login') {
    const email = String(body.email || demoUser.Email);
    const isAdmin = email.toLowerCase().includes('admin');
    return {
      ...demoUser,
      Email: email,
      is_admin: isAdmin,
      IsAdmin: isAdmin,
      Name: isAdmin ? 'Admin' : demoUser.Name,
      Surname: isAdmin ? 'User' : demoUser.Surname,
      accessToken: token(isAdmin),
      refreshToken: token(isAdmin),
    };
  }
  if (path === 'auth/register' || path === 'auth/signup') {
    return { success: true, message: 'Registration successful. Please verify your email.', ...body };
  }
  if (path === 'auth/check-token') {
    return {
      email: demoUser.Email,
      name: demoUser.Name,
      surName: demoUser.Surname,
      referredBy: demoUser.AffiliateCode,
    };
  }
  if (path === 'auth/refresh-token') return { accessToken: token(), refreshToken: token() };
  if (path === 'auth/forgot-password' || path === 'auth/reset-password') {
    return { success: true, message: 'Password reset email sent (demo).' };
  }
  if (path === 'auth/resend-verification' || path === 'auth/verify-email') {
    return { success: true, message: 'Email verification completed (demo).' };
  }

  if (path === 'Dashboard') {
    const sliced = paginate(mockDashboardTransactions, page, 10);
    return {
      Available_Balance: 12840.5,
      Company_Lands_Value: 250000,
      Contract_Start_Date: '2024-01-15T00:00:00.000Z',
      Contract_Expiry_Date: '2028-01-15T00:00:00.000Z',
      Equity_Percentage: 4.85,
      Lands_Value: 18500,
      Minted_Lands: 100,
      Onwhitdraw_balance: 4200,
      Number_of_Pages: sliced.Number_of_Pages,
      Page_size: sliced.Page_size,
      Owned_Lands: 12,
      ROI_Last_Month: 2.4,
      ROI_Until_Now: 18.75,
      Supply_Max: 1000000,
      Wallet_Address: demoUser.WalletAddress,
      return_stats_arrays: [
        {
          year: '2025',
          percentages: [{ Jan: 1.2 }, { Feb: 1.8 }, { Mar: 2.4 }, { Apr: 2.1 }, { May: 2.6 }],
        },
        {
          year: '2024',
          percentages: [
            { Jan: 0.8 },
            { Feb: 1.1 },
            { Mar: 1.4 },
            { Apr: 1.6 },
            { May: 1.9 },
            { Jun: 2.0 },
            { Jul: 2.2 },
            { Aug: 2.1 },
            { Sep: 2.3 },
            { Oct: 2.4 },
            { Nov: 2.5 },
            { Dec: 2.7 },
          ],
        },
      ],
      transactions_list: sliced.items,
    };
  }

  if (path === 'LeaderBoard') {
    const sliced = paginate(mockLeaderboard, page, DEMO_PAGE_SIZE);
    return { LeaderBoard: sliced.items, Number_of_Pages: sliced.Number_of_Pages };
  }

  if (path === 'reward/chart') {
    return [
      {
        year: '2025',
        percentages: [{ Jan: 1.2 }, { Feb: 1.8 }, { Mar: 2.4 }, { Apr: 2.1 }, { May: 2.6 }],
      },
      {
        year: '2024',
        percentages: [
          { Jan: 0.8 },
          { Feb: 1.1 },
          { Mar: 1.4 },
          { Apr: 1.6 },
          { May: 1.9 },
          { Jun: 2.0 },
          { Jul: 2.2 },
          { Aug: 2.1 },
          { Sep: 2.3 },
          { Oct: 2.4 },
          { Nov: 2.5 },
          { Dec: 2.7 },
        ],
      },
    ];
  }

  if (path === 'reward/list') {
    // Client currently expects a flat array; return full list so UI can page locally.
    return mockRewards;
  }

  if (path === 'transactions') {
    return mockTransactions;
  }

  if (path === 'v1/payment/stripe-history' || path === 'card-transactions') {
    return mockCardTransactions;
  }

  if (path === 'assets/balance') {
    return { balance: 12840.5, balanceInUSD: 12840.5 };
  }

  if (path.startsWith('assets/deposit/')) {
    return {
      address: demoUser.WalletAddress,
      network: 'Ethereum',
      qrCode: demoUser.WalletAddress,
    };
  }

  if (path === 'assets/withdrawl' || path === 'assets/withdrawal') {
    return {
      success: true,
      message: 'Withdrawal submitted',
      transactionId: `withdrawal-demo-${Date.now()}`,
    };
  }

  if (path === 'meta-assets') {
    return { price: 1250, weekly_roi: 2.4, available: 250, currency: 'USDT' };
  }

  if (path === 'v2/user-meta-asset') {
    return {
      id: 'sigillum-1042',
      createdAt: '2024-01-15',
      updatedAt: '2025-04-18',
      weekly_roi: 2.4,
      referrer_roi: 0.25,
      contract_start_date: '2024-01-15',
      contract_expiry_date: '2028-01-15',
      last_reward_date: '2025-04-18',
      owned_offices: 12,
      usdt_earned_untill_now: 12840.5,
      usdt_earned_last_month: 2400,
      minted_offices_in_usd: 15000,
      minted_offices: 100,
      owned_offices_in_usd: 18000,
      equity_percentage: 4.85,
      received_rewards: 8,
    };
  }

  if (path === 'users/affiliate-list') {
    const filtered =
      statusFilter === 'ALL'
        ? mockAffiliates
        : mockAffiliates.filter(a => a.status === statusFilter);
    return filtered;
  }

  if (path === 'users/affiliate-report') {
    return mockAffiliateReport;
  }

  if (path === 'users/auto-reinvest') {
    if (method === 'GET') return { enabled: true };
    return { success: true, enabled: Boolean(body.enabled ?? true) };
  }

  if (path === 'users/kyc') {
    if (method === 'GET') return { status: 'approved', verified: true };
    return { success: true, status: 'pending', message: 'KYC submitted (demo).' };
  }

  if (path === 'users/levels') {
    return mockLevels;
  }

  if (path === 'v1/payment/stripe') {
    return { clientSecret: 'local_demo_client_secret', paymentIntentId: 'pi_local_demo' };
  }

  if (path === 'invoices/list') {
    return {
      Invoices: mockInvoices,
      Number_of_Pages: Math.max(1, Math.ceil(mockInvoices.length / DEMO_PAGE_SIZE)),
    };
  }

  if (path.startsWith('v1/pricing/change/')) {
    return { dailyChange: 1.27, dailyChangeInUSD: 29.85 };
  }
  if (path.startsWith('v1/pricing/')) {
    return 2350;
  }

  if (path === 'profile/profile') {
    return { ...demoUser };
  }

  if (path === 'profile/update' || path === 'profile/password') {
    return { success: true, message: 'Profile updated (demo).', ...body };
  }

  if (path.startsWith('v2/users/')) {
    const users = Array.from({ length: 12 }, (_, i) => ({
      ...demoUser,
      Email: i === 0 ? demoUser.Email : `user${i}@aethernum.local`,
      Name: i === 0 ? demoUser.Name : `User`,
      Surname: i === 0 ? demoUser.Surname : `${i}`,
      sub: `demo-user-${i}`,
    }));
    const sliced = paginate(users, page, DEMO_PAGE_SIZE);
    return { Users: sliced.items, Number_of_Pages: sliced.Number_of_Pages };
  }

  if (path.includes('report')) return [];

  if (method !== 'GET') {
    return { success: true, message: 'Demo request completed', ...body };
  }

  return [];
}

async function handler(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const joined = path.join('/');
  let body: Record<string, unknown> = {};
  if (request.method !== 'GET' && request.method !== 'DELETE') {
    try {
      body = await request.json();
    } catch {
      body = {};
    }
  }

  if (joined.match(/^invoices\/.+\/pdf$/)) {
    const text = `Aethernum demo invoice\nGenerated locally for demo purposes.\n`;
    return new NextResponse(text, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="invoice-demo.pdf"',
      },
    });
  }

  const data = responseFor(joined, request.method, body, request.nextUrl);
  return NextResponse.json(data);
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
