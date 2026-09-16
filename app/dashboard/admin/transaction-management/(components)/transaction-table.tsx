// app/dashboard/admin/transaction-management/(components)/transaction-table.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { SearchNormalIcon, CheckActionIcon, CrosActionIcon } from '@/assets/svgs';
import { DataTableNew, Column } from '../../admin_components/data-table';
import { Button } from '@/components/shared';
import { useNumberFormatter } from '../../admin_components/use-number-formatter';
import dayjs from 'dayjs';
import { CheckSquare2 } from 'lucide-react';
import TransactionModal from './transaction-modal';

type Transaction = {
  id: string;
  userId: string;
  type: string;
  date: string;
  status: 'Successful' | 'Failed' | 'Pending';
  amount: number;
  method: string;
  action: 'Approved' | 'Retry' | 'Decision';
};

export default function TransactionsTable() {
  const format = useNumberFormatter();
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Transaction Info');

  //  Dummy data
  const allData: Transaction[] = useMemo(
    () =>
      Array.from({ length: 25 }).map((_, i) => ({
        id: String(133780776234168 + i),
        userId: String(12175688 + (i % 5)),
        type: ['Deposit', 'Withdrawal', 'Purchase'][i % 3]!,
        date: dayjs()
          .subtract(i * 2, 'day')
          .hour(10)
          .minute(12)
          .second(0)
          .toISOString(),
        status: ['Successful', 'Failed', 'Pending'][i % 3] as Transaction['status'],
        amount: 1200 + i * 50,
        method: 'Bank Transfer',
        action: ['Approved', 'Retry', 'Decision'][i % 3] as Transaction['action'],
      })),
    []
  );

  // Filter by searchText (on id, userId, type, method)
  const filtered = useMemo(() => {
    const tokens = searchText.toLowerCase().split(/\s+/).filter(Boolean);
    return allData.filter(row => {
      const hay = `${row.id} ${row.userId} ${row.type} ${row.method}`.toLowerCase();
      return tokens.every(t => hay.includes(t));
    });
  }, [allData, searchText]);

  // Column definitions
  const columns: Column<Transaction>[] = [
    { key: 'id', header: 'Transaction ID', accessor: 'id' },
    { key: 'userId', header: 'UserID Associated', accessor: 'userId' },
    { key: 'type', header: 'Type', accessor: 'type', sortable: true },
    {
      key: 'date',
      header: 'Date and time',
      accessor: 'date',
      sortable: true,
      renderCell: r => dayjs(r.date).format('DD MMM YYYY hh:mm a'),
    },
    {
      key: 'status',
      header: 'Status',
      accessor: 'status',
      filterOptions: ['Successful', 'Failed', 'Pending'],
      renderCell: r => {
        const cls =
          r.status === 'Successful'
            ? 'text-brand-mint'
            : r.status === 'Failed'
              ? 'text-brand-red'
              : 'text-brand-gold';
        return <span className={cls}>{r.status}</span>;
      },
    },
    {
      key: 'amount',
      header: 'Amount',
      accessor: 'amount',
      sortable: true,
      renderCell: r => <>$ {format(r.amount)}</>,
    },
    { key: 'method', header: 'Method', accessor: 'method' },
    {
      key: 'actions',
      header: 'Actions',
      renderCell: r => {
        let actionNode: React.ReactNode;
        switch (r.action) {
          case 'Approved':
            actionNode = (
              <div className="flex items-center gap-2 text-brand-mint">
                <CheckSquare2 className="text-brand-mint" />{' '}
                <span className="text-xs">Approved</span>
              </div>
            );
            break;
          case 'Retry':
            actionNode = (
              <Button
                title="Retry"
                variant="primary"
                className="rounded-full !px-6 !py-1 text-xs capitalize text-black"
              />
            );
            break;
          default:
            actionNode = (
              <div className="flex items-center gap-2">
                <CheckActionIcon /> <CrosActionIcon />
              </div>
            );
        }
        return (
          <div className="flex items-center gap-3">
            <Button
              title="View"
              variant="outlineBlue"
              className="!px-4 !py-1 text-xs capitalize"
              onClick={() => {
                setActiveTab('Transaction Info');
                openModal();
              }}
            />
            {actionNode}
          </div>
        );
      },
    },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-gradient text-2xl font-bold">Transactions</h1>
        <div className="relative w-full lg:w-[40%]">
          <input
            type="text"
            placeholder="Search by method, type, userId, transaction ID"
            autoComplete="off"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="w-full rounded-full bg-light py-3 pl-4 pr-10 text-xs text-white placeholder-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold"
          />
          <SearchNormalIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-white" />
        </div>
      </div>

      <DataTableNew columns={columns} data={filtered} pageSize={5} />

      {/* Modal */}
      <div>
        <TransactionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
}
