// components/admin/transaction-management/transaction-modal.tsx
'use client';

import React from 'react';
import { CircleX } from 'lucide-react';
import { DataTableNew, Column } from '../../admin_components/data-table';
import { Button } from '@/components/shared';
import { useNumberFormatter } from '../../admin_components/use-number-formatter';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

type HistoryEntry = {
  date: string;
  ip: string;
  location: string;
  adminAction: string;
  statusChange: string;
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function TransactionModal({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
}: TransactionModalProps) {
  const fmt = useNumberFormatter();

  if (!isOpen) return null;

  // ── 1) Expanded Dummy Data (12 rows) ────────────────────────────────────────
  const historyData: HistoryEntry[] = [
    {
      date: '12 JAN 2024',
      ip: '128.1.123.970',
      location: 'France',
      adminAction: 'Created transaction',
      statusChange: 'Pending → Completed',
    },
    {
      date: '13 JAN 2024',
      ip: '128.1.123.971',
      location: 'Germany',
      adminAction: 'Reviewed transaction',
      statusChange: 'Pending → Completed',
    },
    {
      date: '14 JAN 2024',
      ip: '128.1.123.972',
      location: 'USA',
      adminAction: 'Verified documents',
      statusChange: 'Pending → Completed',
    },
    {
      date: '15 JAN 2024',
      ip: '128.1.123.973',
      location: 'Canada',
      adminAction: 'Marked as completed',
      statusChange: 'Pending → Completed',
    },
    {
      date: '16 JAN 2024',
      ip: '128.1.123.974',
      location: 'UK',
      adminAction: 'Finalized status',
      statusChange: 'Pending → Completed',
    },
    {
      date: '17 JAN 2024',
      ip: '128.1.123.975',
      location: 'Spain',
      adminAction: 'Sent to review',
      statusChange: 'Pending → Completed',
    },
    {
      date: '18 JAN 2024',
      ip: '128.1.123.976',
      location: 'Italy',
      adminAction: 'Verified KYC',
      statusChange: 'Pending → Completed',
    },
    {
      date: '19 JAN 2024',
      ip: '128.1.123.977',
      location: 'Japan',
      adminAction: 'Customer confirmation',
      statusChange: 'Pending → Completed',
    },
    {
      date: '20 JAN 2024',
      ip: '128.1.123.978',
      location: 'Australia',
      adminAction: 'Audit logging',
      statusChange: 'Pending → Completed',
    },
    {
      date: '21 JAN 2024',
      ip: '128.1.123.979',
      location: 'Brazil',
      adminAction: 'Reconciled record',
      statusChange: 'Pending → Completed',
    },
    {
      date: '22 JAN 2024',
      ip: '128.1.123.980',
      location: 'Mexico',
      adminAction: 'Flagged for review',
      statusChange: 'Pending → Completed',
    },
    {
      date: '23 JAN 2024',
      ip: '128.1.123.981',
      location: 'Sweden',
      adminAction: 'Final approval',
      statusChange: 'Pending → Completed',
    },
  ];

  // ── 2) Columns Definition (with two sortable fields: date + ipLocation) ───────
  const historyColumns: Column<HistoryEntry>[] = [
    {
      key: 'date',
      header: 'Date of Action',
      accessor: 'date',
      sortable: true,
      renderCell: row => (
        <div className="flex items-center gap-4">
          <span>{row.date}</span>
          <span className="flex items-center">
            <span className="text-gray-400">::</span>
            <span>{row.ip}</span>
          </span>
        </div>
      ),
    },
    {
      key: 'ipLocation',
      header: 'IP and Location',
      renderCell: row => (
        <div className="flex items-center gap-4">
          <span>{row.ip}</span>
          <span className="flex items-center">
            <span className="text-gray-400">::</span>
            <span>{row.location}</span>
          </span>
        </div>
      ),
    },
    {
      key: 'adminAction',
      header: 'Admin Actions',
      accessor: 'adminAction',
    },
    {
      key: 'statusChange',
      header: 'Status Change Log',
      accessor: 'statusChange',
    },
  ];

  // ── 3) Dummy values for other tabs ───────────────────────────────────────────

  const transactionInfo = {
    id: '133780776234168',
    date: '12 JAN 2024 10:12 am',
    amount: 1200, // numeric
    type: 'Deposit',
    status: 'Successful',
    method: 'Bank Transfer',
  };

  const userDetails = {
    userId: '12175688',
    username: 'John Doe',
    email: 'johndoe@gmail.com',
    wallet: '1A1zP1eP5QGefi2DMP…0x3',
    registrationDate: '12 JAN 2024',
    kyc: 'Approved',
  };

  const breakdown = {
    fees: 1200, // numeric
    method: 'Bank Transfer',
    Sigillum: 'Lorem Ipsum',
    rate: '1 RV = 0.00600 USD',
    beforeBalance: 56200, // numeric
    afterBalance: 57400, // numeric
  };

  const statusInfo = {
    currentStatus: 'Completed',
    pendingDuration: '--',
    errorMsg:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0A0A0EBF] backdrop-blur-sm" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative z-10 mx-4 w-full max-w-4xl rounded-xl bg-light p-2">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <h2 className="text-gradient text-xl font-medium">View Transaction Details</h2>
          <button
            className="rounded-full p-1 text-white transition hover:bg-dark"
            onClick={onClose}
          >
            <CircleX />
          </button>
        </div>

        {/* Tabs */}
        <nav className="flex ">
          {[
            'Transaction Info',
            'User Details',
            'Transaction Breakdown',
            'Transaction History',
            'Transaction Status',
          ].map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 text-xs ${
                activeTab === tab ? 'border-b-2 border-[#00FF94] text-[#00FF94]' : 'text-white'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="space-y-4 p-4">
          {/* 1) Transaction Info Tab */}
          {activeTab === 'Transaction Info' && (
            <div>
              <div className="rounded-lg bg-light p-4 text-sm text-white">
                <div className="grid grid-cols-4 gap-4 pb-4">
                  <div>
                    <p className="mb-1 text-xs text-brand-gold">Transaction ID</p>
                    <p className="text-white">{transactionInfo.id}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-brand-gold">Date and time</p>
                    <p className="text-white">{transactionInfo.date}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-brand-gold">Amount</p>
                    <p className="text-white">$ {fmt(transactionInfo.amount)}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-brand-gold">Transaction Type</p>
                    <p className="text-white">{transactionInfo.type}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 py-4">
                  <div>
                    <p className="mb-1 text-xs text-brand-gold">Status</p>
                    <p className="text-sm text-brand-mint">{transactionInfo.status}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-brand-gold">Transaction Method</p>
                    <p className="text-white">{transactionInfo.method}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2 text-xs">
                <Button
                  title="Approve"
                  variant="primary"
                  className="rounded-full !px-4 !py-1 text-xs capitalize"
                />
                <Button
                  title="Reject"
                  variant="danger"
                  className="rounded-full !px-4 !py-1 text-xs capitalize"
                />
                <Button
                  title="Retry"
                  variant="primary"
                  className="rounded-full !px-4 !py-1 text-xs capitalize text-black"
                />
              </div>
            </div>
          )}

          {/* 2) User Details Tab */}
          {activeTab === 'User Details' && (
            <div>
              <div className="rounded-lg bg-light p-4 text-sm text-white">
                <div className="grid grid-cols-4 gap-4  pb-4">
                  <div>
                    <p className="mb-1 text-xs text-brand-gold">User ID</p>
                    <p className="text-white">{userDetails.userId}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-brand-gold">Username</p>
                    <p className="text-white">{userDetails.username}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-brand-gold">Email</p>
                    <p className="text-white">{userDetails.email}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-brand-gold">Wallet Address</p>
                    <p className="text-white">{userDetails.wallet}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-4">
                  <div>
                    <p className="mb-1 text-xs text-brand-gold">Registration Date</p>
                    <p className="text-white">{userDetails.registrationDate}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-brand-gold">KYC Status</p>
                    <p className="text-sm text-brand-mint">{userDetails.kyc}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Button
                  title="View Full User Profile"
                  variant="outlineBlue"
                  className="!px-5 !py-1 text-xs capitalize"
                />
              </div>
            </div>
          )}

          {/* 3) Transaction Breakdown Tab */}
          {activeTab === 'Transaction Breakdown' && (
            <div>
              <div className="flex justify-between gap-6 rounded-lg bg-light p-4 text-sm text-white">
                <div className="flex gap-2">
                  <div>
                    <p className="mb-1 text-xs text-brand-gold">Fees applied</p>
                    <p className="text-white">$ {fmt(breakdown.fees)}</p>
                  </div>
                  <div className="text-gray-400 flex items-end text-xs">
                    <span>:: {breakdown.method}</span>
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-xs text-brand-gold">Sigillum involved</p>
                  <p className="text-white">{breakdown.Sigillum}</p>
                </div>
                <div>
                  <p className="mb-1 text-xs text-brand-gold">Exchange rate</p>
                  <p className="text-white">{breakdown.rate}</p>
                </div>
              </div>

              <p className="mt-4 text-sm text-white">Wallet balance</p>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-light p-4 text-sm text-white">
                  <p className="mb-1 text-xs text-brand-gold">Before Transaction</p>
                  <p className="text-white">$ {fmt(breakdown.beforeBalance)}</p>
                </div>
                <div className="rounded-lg bg-light p-4 text-sm text-white">
                  <p className="mb-1 text-xs text-brand-gold">After Transaction</p>
                  <p className="text-white">$ {fmt(breakdown.afterBalance)}</p>
                </div>
              </div>
            </div>
          )}

          {/* 4) Transaction History Tab (uses DataTableNew) */}
          {activeTab === 'Transaction History' && (
            <div>
              <DataTableNew<HistoryEntry>
                columns={historyColumns}
                data={historyData}
                pageSize={5}
                theadBg="bg-light"
                tbodyBg="bg-light"
                footerBg="bg-light"
                hoverBg="hover:bg-dark transition-all duration-300"
              />
            </div>
          )}

          {/* 5) Transaction Status Tab */}
          {activeTab === 'Transaction Status' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-light p-4 text-sm text-white">
                  <p className="mb-1 text-xs text-brand-gold">
                    Real-time view of the current transaction status
                  </p>
                  <p className="text-brand-mint">{statusInfo.currentStatus}</p>
                </div>
                <div className="rounded-lg bg-light p-4 text-sm text-white">
                  <p className="mb-1 text-xs text-brand-gold">Pending Duration</p>
                  <p className="text-white">{statusInfo.pendingDuration}</p>
                </div>
              </div>
              <div className="rounded-lg bg-light p-4 text-sm text-white">
                <p className="mb-1 text-xs text-brand-gold">Error message</p>
                <p className="text-white">{statusInfo.errorMsg}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
