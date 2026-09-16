/** Shared demo fixtures for local `/api` route handlers. Page size is 5 for multi-page tables. */

export const DEMO_PAGE_SIZE = 5;

export const demoUser = {
  Email: 'demo@aethernum.local',
  Name: 'Demo',
  Surname: 'User',
  AffiliateCode: 'AETH-DEMO',
  WalletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  PasswordResetAt: 0,
  Country: 'United States',
  Phone: '+1 555 0100',
  IsDemo: false,
  IsRewardsEnabled: true,
  IsAdmin: false,
  IsFirstLogin: false,
  LastLogin: Date.now(),
  sub: 'demo-user',
  emailVerified: true,
  is_admin: false,
  is_demo: false,
  is_rewards_enabled: true,
};

export function paginate<T>(items: T[], page = 1, pageSize = DEMO_PAGE_SIZE) {
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    Number_of_Pages: Math.max(1, Math.ceil(items.length / pageSize)),
    Page_size: pageSize,
    total: items.length,
    page: safePage,
  };
}

const statuses = ['CONFIRMED', 'PENDING', 'REJECTED', 'CONFIRMED', 'CONFIRMED'] as const;
const txTypes = ['Reward', 'Withdrawal', 'DEPOSIT', 'Reward', 'Withdrawal'] as const;

export const mockTransactions = Array.from({ length: 12 }, (_, i) => {
  const day = 18 - i;
  const value = i % 3 === 0 ? (2400.123456789).toFixed(8) : String(500 + i * 125);
  const eth = i % 3 === 0 ? '1.023456789012' : (0.2 + i * 0.05).toFixed(6);
  return {
    id: `tx-${1042 + i}`,
    createdAt: `2025-04-${String(Math.max(1, day)).padStart(2, '0')}T12:00:00Z`,
    updatedAt: `2025-04-${String(Math.max(1, day)).padStart(2, '0')}T12:00:00Z`,
    hash: `0x8a21${(1000 + i).toString(16)}93ef${(2000 + i).toString(16)}abcd`,
    from: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    to: '0xAeth000000000000000000000000000000000001',
    contract: 'AETH',
    value,
    value_in_eth: eth,
    token: 'USDT',
    blockNumber: 19842011 + i,
    type: txTypes[i % txTypes.length],
    status: statuses[i % statuses.length],
    eth_price: 2350 + i * 3,
    changed_eth_price: 29.85 + i,
    changed_eth_price_percentage: i % 2 === 0 ? 1.27 : -0.84,
  };
});

export const mockCardTransactions = Array.from({ length: 8 }, (_, i) => ({
  id: `card-tx-${i + 1}`,
  amount: 1250 + i * 100,
  currency: 'usd',
  brand: i % 2 === 0 ? 'visa' : 'mastercard',
  last4: String(4240 + i),
  timestamp: 1713441600 - i * 86400,
  status: i % 3 === 0 ? 'Pending' : 'Approved',
  date: `2025-0${Math.max(1, 4 - Math.floor(i / 3))}-${String(18 - i).padStart(2, '0')}`,
}));

export const mockRewards = Array.from({ length: 12 }, (_, i) => ({
  amount: i % 4 === 0 ? 2400.987654321 : 1800 - i * 50,
  date: `2025-${String(Math.max(1, 4 - Math.floor(i / 3))).padStart(2, '0')}-18`,
  type: i % 2 === 0 ? 'Monthly reward' : 'Referral reward',
  from: `Sigillum #${1042 - i}`,
}));

export const mockAffiliates = [
  {
    name: 'Alex Partner',
    asset_value: 4500.123456,
    meta_assets_owned: 4,
    weekly_comission: 108.5,
    open_position_date: '2024-06-01',
    close_position_date: '',
    status: 'ACTIVE',
    level: 1,
  },
  {
    name: 'Jordan Lee',
    asset_value: 8200,
    meta_assets_owned: 7,
    weekly_comission: 196.8,
    open_position_date: '2024-03-12',
    close_position_date: '',
    status: 'ACTIVE',
    level: 2,
  },
  {
    name: 'Sam Rivera',
    asset_value: 2100.5,
    meta_assets_owned: 2,
    weekly_comission: 50.4,
    open_position_date: '2024-09-20',
    close_position_date: '2025-01-15',
    status: 'INACTIVE',
    level: 1,
  },
  {
    name: 'Casey Morgan',
    asset_value: 12500.987654321,
    meta_assets_owned: 10,
    weekly_comission: 300,
    open_position_date: '2023-11-05',
    close_position_date: '',
    status: 'ACTIVE',
    level: 3,
  },
  {
    name: 'Riley Chen',
    asset_value: 0,
    meta_assets_owned: 0,
    weekly_comission: 0,
    open_position_date: '2025-02-01',
    close_position_date: '',
    status: 'INACTIVE',
    level: 1,
  },
  {
    name: 'Taylor Brooks',
    asset_value: 3600,
    meta_assets_owned: 3,
    weekly_comission: 86.4,
    open_position_date: '2024-07-18',
    close_position_date: '',
    status: 'ACTIVE',
    level: 1,
  },
  {
    name: 'Morgan Blake',
    asset_value: 5400.25,
    meta_assets_owned: 5,
    weekly_comission: 129.6,
    open_position_date: '2024-01-22',
    close_position_date: '2024-12-01',
    status: 'INACTIVE',
    level: 2,
  },
  {
    name: 'Quinn Hayes',
    asset_value: 9800,
    meta_assets_owned: 8,
    weekly_comission: 235.2,
    open_position_date: '2023-08-14',
    close_position_date: '',
    status: 'ACTIVE',
    level: 2,
  },
];

export const mockAffiliateReport = {
  referrals: 8,
  is_eligable_for_reward: 'Yes',
  meta_assets: 12,
  total_assets_value: 18500,
  reward_percentage: 0.25,
  sales_comission: 108.5,
  last_month_rewards: 432,
  level_1: 4,
  level_2: 3,
  level_3: 1,
  total_affiliates: 8,
  total_rewards: 432,
  active_affiliates: 5,
};

export const mockInvoices = Array.from({ length: 12 }, (_, i) => ({
  id: `inv-${1042 - i}`,
  createdAt: `2025-0${Math.max(1, 4 - Math.floor(i / 3))}-${String(18 - (i % 10)).padStart(2, '0')}`,
  updatedAt: `2025-0${Math.max(1, 4 - Math.floor(i / 3))}-${String(18 - (i % 10)).padStart(2, '0')}`,
  amount: 1250 + i * 250,
  date: `2025-0${Math.max(1, 4 - Math.floor(i / 3))}-${String(18 - (i % 10)).padStart(2, '0')}`,
  duration: 52,
  meta_asset_price: 1250,
  quantity: 1 + (i % 3),
}));

export const mockLeaderboard = Array.from({ length: 12 }, (_, i) => ({
  ImageProfileUrl: '',
  Position: i + 1,
  Score: 9840 - i * 420,
  Username: i === 0 ? 'Demo User' : `Trader ${i + 1}`,
  WalletAddress:
    i === 0
      ? demoUser.WalletAddress
      : `0x${(BigInt('1000000000000000') + BigInt(i)).toString(16).padStart(40, '0')}`,
}));

export const mockDashboardTransactions = mockTransactions.slice(0, 10).map(tx => ({
  Amount: Number(tx.value),
  Status:
    tx.status === 'CONFIRMED' ? 'Approved' : tx.status === 'PENDING' ? 'Pending' : 'Rejected',
  Transaction_Date: tx.updatedAt.slice(0, 10),
  Transaction: tx.type,
  TxHash: tx.hash.slice(0, 10) + '...' + tx.hash.slice(-4),
  Type: tx.type === 'Withdrawal' ? 'Debit' : 'Credit',
}));

export const mockLevels = [
  { level: 1, name: 'Starter', required_referrals: 0, commission: 0.25 },
  { level: 2, name: 'Builder', required_referrals: 5, commission: 0.35 },
  { level: 3, name: 'Pro', required_referrals: 15, commission: 0.45 },
  { level: 4, name: 'Elite', required_referrals: 40, commission: 0.55 },
];
