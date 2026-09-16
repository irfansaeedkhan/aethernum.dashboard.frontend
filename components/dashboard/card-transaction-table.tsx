import { Column, DataTableNew } from '@/app/dashboard/admin/admin_components/data-table';
import { DollarCoin } from '@/assets/svgs';
import { GetCardTransactionDetailResponse } from '@/lib/auth/get-card-transaction-details';
import { sliceAccountAddress } from '@/utils/slice-account-address';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';

interface Props {
  cardTransactionDetailList: GetCardTransactionDetailResponse | null | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const CardTransactionTable: React.FC<Props> = ({ cardTransactionDetailList, page, setPage }) => {
  // Paginated Data
  const pageData = useMemo(
    () => cardTransactionDetailList?.slice((page - 1) * 10, page * 10),
    [cardTransactionDetailList, page]
  );

  if (!cardTransactionDetailList) {
    return <div className="w-full p-20 text-center text-white">No record found</div>;
  }

  // Define columns for DataTableNew
  const columns: Column<GetCardTransactionDetailResponse[number]>[] = [
    {
      key: 'brand',
      header: 'Bank Circuit',
      accessor: 'brand',
    },
    {
      key: 'timestamp',
      header: 'Date',
      accessor: 'timestamp',
      renderCell: row => dayjs(row.timestamp * 1000).format('DD MMM YYYY'), // Convert to milliseconds
    },
    {
      key: 'amount',
      header: 'Amount',
      accessor: 'amount',
      renderCell: row => (
        <span className="flex items-center gap-1">
          <DollarCoin className="size-5 h-5 w-5 shrink-0" />
          {row.amount ?? 'N/A'}
        </span>
      ),
    },
    {
      key: 'currency',
      header: 'Currency',
      accessor: 'currency',
      renderCell: row => <span>{row.currency ?? 'N/A'}</span>,
    },
    {
      key: 'last4',
      header: 'Last 4 Digits',
      accessor: 'last4',
      renderCell: row => sliceAccountAddress(row.last4) ?? 'N/A',
    },
  ];

  return (
    <div className="max-w-full overflow-x-auto">
      <DataTableNew
        columns={columns}
        data={pageData || []}
        pageSize={10}
        theadBg="bg-dark"
        tbodyBg="bg-light"
        footerBg="bg-dark"
        hoverBg="hover:bg-[#0b13147d]"
      />
    </div>
  );
};
