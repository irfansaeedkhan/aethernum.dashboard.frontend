'use client';

import React, { useState } from 'react';
import { Button } from '@/components/shared';
import { CircleX, X } from 'lucide-react';
import { SearchNormalIcon } from '@/assets/svgs';
import { Column, DataTableNew } from '../../../admin_components/data-table';

const dummyUsers = Array.from({ length: 10 }).map((_, i) => ({
  userId: '12175688',
  username: 'John Doe',
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  regDate: '12 JAN 2024',
  status: ['Active', 'Inactive', 'Suspended'][i % 3],
  reward: 1200,
  wallet: 1200,
}));

const ViewRewardModal = ({ isOpen, onClose, eventData }: any) => {
  const [filter, setFilter] = useState('');

  const filtered = dummyUsers.filter(u =>
    `${u.username} ${u.email} ${u.userId}`.toLowerCase().includes(filter.toLowerCase())
  );

  const columns: Column<any>[] = [
    {
      key: 'select',
      header: '',
      renderCell: () => <input type="checkbox" className="accent-blue-500" />,
    },
    { key: 'userId', header: 'User ID', accessor: 'userId' },
    { key: 'username', header: 'Username', accessor: 'username' },
    { key: 'name', header: 'Name and Surname', accessor: 'name' },
    { key: 'email', header: 'Email', accessor: 'email' },
    { key: 'regDate', header: 'Registration Date', accessor: 'regDate' },
    {
      key: 'status',
      header: 'Status',
      renderCell: row => {
        const color =
          row.status === 'Active'
            ? 'text-brand-mint'
            : row.status === 'Inactive'
              ? 'text-brand-gold'
              : 'text-brand-red';
        return <span className={color}>{row.status}</span>;
      },
    },
    {
      key: 'reward',
      header: 'Reward Amount',
      renderCell: row => `$${row.reward.toLocaleString()}`,
    },
    {
      key: 'wallet',
      header: 'Wallet Balance',
      renderCell: row => `$${row.wallet.toLocaleString()}`,
    },
    {
      key: 'actions',
      header: 'Actions',
      renderCell: () => (
        <div className="flex flex-col gap-2">
          <Button
            title="View Profile"
            variant="outlineBlue"
            className="!px-3 !py-1 text-[10px] capitalize"
          />
          <Button title="Exclude" variant="danger" className="!px-3 !py-1 text-[10px] capitalize" />
          <Button
            title="Recover Reward"
            variant="primary"
            className="!px-3 !py-1 text-[10px] capitalize"
          />
        </div>
      ),
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center text-white">
      <div className="absolute inset-0 bg-[#0A0A0EBF] backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-6xl rounded-xl bg-light p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-gradient text-2xl font-bold">View Reward</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <CircleX />
          </button>
        </div>

        {/* Top Info */}
        <div className="mb-6 rounded-lg bg-light p-6 text-sm">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-brand-gold">Reward Period</p>
              <p>20/2024</p>
            </div>
            <div>
              <p className="text-brand-gold">Date and time</p>
              <p>12 JAN 2024 10:12 am</p>
            </div>
            <div>
              <p className="text-brand-gold">Type</p>
              <p>Affiliate</p>
            </div>
            <div>
              <p className="text-brand-gold">Status</p>
              <p className="text-brand-gold">To Pay Next Cycle</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 pt-6">
            <div>
              <p className="text-brand-gold">Total Users involved</p>
              <p>14</p>
            </div>
            <div>
              <p className="text-brand-gold">Total Reward Amount</p>
              <p>$1,200</p>
            </div>
          </div>
        </div>

        <div className="mb-2 mt-10 flex items-center justify-between">
          {/* Table Heading */}
          <h3 className="mb-2 text-sm font-semibold">List of Users involved</h3>

          {/* Search */}
          <div className="relative mb-4 ml-auto w-full max-w-lg">
            <input
              type="text"
              placeholder="Search by email, username, userID"
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="w-full rounded-full bg-dark px-4 py-3 text-xs placeholder:text-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
            <SearchNormalIcon className="text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Table */}
        <DataTableNew<any>
          columns={columns}
          data={filtered}
          pageSize={3}
          theadBg="bg-light"
          tbodyBg="bg-light"
          footerBg="bg-light"
          hoverBg="hover:bg-dark"
        />

        {/* Bottom Buttons */}
        <div className="mt-4 flex justify-start gap-4 rounded-lg bg-light p-4">
          <Button
            title="Assign"
            variant="primary"
            className="rounded-full !px-3 !py-2 text-[10px] capitalize"
          />
          <Button
            title="Suspend"
            variant="danger"
            className="rounded-full !px-3 !py-2 text-[10px] capitalize"
          />
          <Button
            title="Recover Reward"
            variant="primary"
            className="rounded-full !px-3 !py-2 text-[10px] capitalize"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewRewardModal;
