import { Column, DataTableNew } from '@/app/dashboard/admin/admin_components/data-table';
import { DollarCoin } from '@/assets/svgs';
import { GetRewardListItemResponse } from '@/lib/auth/get-rewards-list';
import dayjs from 'dayjs';
import React from 'react';

interface Props {
  rewardListData: GetRewardListItemResponse;
  page: number;
  onPageChange?: (page: number) => void;
}

export const RewardListTable: React.FC<Props> = ({ rewardListData, page, onPageChange }) => {
  const columns: Column<GetRewardListItemResponse[number]>[] = [
    {
      key: 'date',
      header: 'Date',
      accessor: 'date',
      renderCell: row => (row.date ? dayjs(row.date).format('DD MMM YYYY') : 'N/A'),
    },
    {
      key: 'amount',
      header: 'Amount',
      accessor: 'amount',
      renderCell: row => (
        <span className="flex items-center gap-1">
          <DollarCoin className="size-5 h-5 w-5 shrink-0" />
          <span className="opacity-60">
            {row.amount != null ? Number(row.amount).toFixed(2) : 'N/A'} US$
          </span>
        </span>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      accessor: 'type',
      renderCell: row => row.type ?? 'N/A',
    },
    {
      key: 'from',
      header: 'From',
      accessor: 'from',
      renderCell: row => row.from ?? 'N/A',
    },
  ];

  const totalPages = Math.max(1, Math.ceil(rewardListData.length / 5));
  const pageData = rewardListData.slice((page - 1) * 5, page * 5);

  return (
    <div className="px-2">
      <div className="flex w-full flex-col rounded-xl bg-light shadow-3">
        <div className="max-w-full overflow-x-auto">
          <DataTableNew
            columns={columns}
            data={pageData}
            pageSize={5}
            theadBg="bg-dark"
            tbodyBg="bg-light"
            footerBg="bg-dark"
            hoverBg="hover:bg-[#0b13147d]"
            externalPagination={
              onPageChange
                ? {
                    currentPage: page,
                    totalPages,
                    onPageChange,
                  }
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
};
