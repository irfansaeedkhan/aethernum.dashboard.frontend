import { Column, DataTableNew } from '@/app/dashboard/admin/admin_components/data-table';
import { CarretDownIcon, CarretUpIcon, DollarCoin, ETHIcon } from '@/assets/svgs';
import { GetTransactionDetailResponse } from '@/lib/auth/get-transaction-details';
import { sliceAccountAddress } from '@/utils/slice-account-address'; // Import the function
import dayjs from 'dayjs';
import React from 'react';

type TransactionRow = GetTransactionDetailResponse[number];

interface Props {
  transactionDetailList: GetTransactionDetailResponse | null | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const TransactionTable: React.FC<Props> = ({ transactionDetailList, page, setPage }) => {
  if (!transactionDetailList) {
    return <div className="w-full p-20 text-center text-white">No record found</div>;
  }

  const totalPages = Math.max(1, Math.ceil(transactionDetailList.length / 5));
  const pageData = transactionDetailList.slice((page - 1) * 5, page * 5);

  // Define columns for DataTableNew
  const columns: Column<TransactionRow>[] = [
    {
      key: 'type',
      header: 'Type',
      accessor: 'type',
    },
    {
      key: 'updatedAt',
      header: 'Date',
      accessor: 'updatedAt',
      renderCell: row => dayjs(row.updatedAt).format('DD MMM YYYY'),
    },
    {
      key: 'value_usd',
      header: 'Amount (US$)',
      accessor: 'value',
      renderCell: row => (
        <span className="flex items-center gap-1">
          <DollarCoin className="size-5 h-5 w-5 shrink-0" />
          {row.value ?? 'N/A'} US$
        </span>
      ),
    },
    {
      key: 'value_eth',
      header: 'Amount (ETH)',
      accessor: 'value_in_eth',
      renderCell: row => (
        <div className="flex flex-col gap-1 lg:flex-row">
          <span className="flex items-center gap-3">
            <ETHIcon className="size-5 h-5 w-5 shrink-0" />
            {row.value_in_eth ?? 'N/A'} ETH
          </span>
        </div>
      ),
    },
    {
      key: 'eth_price',
      header: 'ETH price at the time',
      accessor: 'eth_price',
      renderCell: row => (
        <div className="flex flex-col gap-1 lg:flex-row">
          <span className="flex items-center gap-3">{row.eth_price ?? 'N/A'} ETH</span>
          <div className="flex items-center gap-1 text-xxs font-medium">
            {row.changed_eth_price_percentage >= 0 ? (
              <span className="flex items-center gap-1 text-sm text-xxs font-medium text-brand-mint">
                <CarretUpIcon className="size-4 fill-brand-mint stroke-brand-mint" />
                {row.changed_eth_price_percentage}%
              </span>
            ) : (
              <span className="flex items-center gap-1 text-sm text-xxs font-medium text-brand-red">
                <CarretDownIcon className="size-4 fill-brand-red stroke-brand-red" />
                {row.changed_eth_price_percentage}%
              </span>
            )}
            <span className="text-sm text-xxs font-medium text-white/50">
              (~ US$ {row.changed_eth_price})
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'transaction',
      header: 'Transaction',
      accessor: 'from',
      renderCell: row => (
        <>
          <span>{row.type === 'DEPOSIT' ? 'From:' : 'To:'}</span>
          <br />
          <span>
            {row.type === 'DEPOSIT' ? sliceAccountAddress(row.from) : sliceAccountAddress(row.to)}
          </span>
        </>
      ),
    },
    {
      key: 'hash',
      header: 'Hash',
      accessor: 'hash',
      renderCell: row => (row.hash ? sliceAccountAddress(row.hash) : 'N/A'), // Apply sliceAccountAddress
    },
    {
      key: 'status',
      header: 'Status',
      accessor: 'status',
      renderCell: row => {
        const status = String(row.status || '').toUpperCase();
        const label =
          status === 'CONFIRMED' || status === 'APPROVED'
            ? 'Approved'
            : status === 'PENDING'
              ? 'Pending'
              : status === 'REJECTED'
                ? 'Rejected'
                : row.status || 'N/A';
        const color =
          label === 'Approved'
            ? 'text-brand-mint'
            : label === 'Pending'
              ? 'text-[#D80027]'
              : label === 'Rejected'
                ? 'text-brand-red'
                : 'text-white';
        return <span className={color}>{label}</span>;
      },
    },
  ];

  return (
    <div className="max-w-full overflow-x-auto">
      <DataTableNew<TransactionRow>
        columns={columns}
        data={pageData}
        pageSize={5}
        theadBg="bg-dark"
        tbodyBg="bg-light"
        footerBg="bg-dark"
        hoverBg="hover:bg-[#0b13147d]"
        externalPagination={{
          currentPage: page,
          totalPages,
          onPageChange: setPage,
        }}
      />
    </div>
  );
};
