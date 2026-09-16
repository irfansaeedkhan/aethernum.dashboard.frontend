import Link from 'next/link';
import { Button } from '@/components/shared';
import { FailTransactionIcon } from '@/assets/svgs';

interface FailedTransactionsCardProps {
  failedCount?: number;
  className?: string;
}

const FailedTransactionsCard: React.FC<FailedTransactionsCardProps> = ({
  failedCount = 56,
  className = '',
}) => {
  return (
    <div className={`flex rounded-xl bg-light p-4 ${className}`}>
      <div className="mr-4">
        <FailTransactionIcon />
      </div>
      <div className="flex flex-grow flex-col justify-between">
        <h2 className="mb-1 text-sm text-white">Failed Transactions</h2>
        <div className="mt-10 text-3xl font-normal text-brand-red">{failedCount}</div>
      </div>

      <Link href="/dashboard/admin/transaction-management/failed-transaction" className="self-end">
        <Button
          title="Take Action"
          className="rounded-full !py-2 px-8 capitalize md:!py-2 md:px-8"
        />
      </Link>
    </div>
  );
};

export default FailedTransactionsCard;
