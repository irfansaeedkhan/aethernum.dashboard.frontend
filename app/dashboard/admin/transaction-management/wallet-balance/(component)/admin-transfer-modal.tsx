// components/admin/admin-transfer-modal.tsx
'use client';

import React, { useState } from 'react';
import { CircleX } from 'lucide-react';
import { ArrowSquareDownIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';

interface AdminTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WALLET_OPTIONS = ['Company wallets – Main', 'Rewards', 'Commissions', 'Income'];

const AdminTransferModal: React.FC<AdminTransferModalProps> = ({ isOpen, onClose }) => {
  // Controlled “From” / “To” dropdown open/close state:
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  // Which wallet is selected in From/To:
  const [selectedFrom, setSelectedFrom] = useState(WALLET_OPTIONS[0]);
  const [selectedTo, setSelectedTo] = useState(WALLET_OPTIONS[0]);

  // Controlled amount input:
  const [amountValue, setAmountValue] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#0A0A0EBF] backdrop-blur-sm" onClick={onClose} />

      {/* Modal container */}
      <div className="relative mx-4 w-full max-w-4xl rounded-xl bg-light p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-gradient text-2xl font-semibold">Transfer Amount Tool</h2>
          <button onClick={onClose} className="rounded-full p-1 text-white hover:text-white">
            <CircleX className="text-white" size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="rounded-lg bg-light p-4">
          {/* Labels Row */}
          <div className="mb-2 flex text-sm text-white">
            <div className="flex-1 px-2">From</div>
            <div className="flex-1 px-2">Amount</div>
            <div className="flex-1 px-2">To</div>
          </div>

          {/* Inputs Row */}
          <div className="flex">
            {/* ─── 1) FROM dropdown ───────────────────────────────────────────── */}
            <div className="relative flex-1 px-2 text-xs">
              <button
                onClick={() => {
                  setFromOpen(o => !o);
                  setToOpen(false);
                }}
                className="
                  flex w-full items-center justify-between gap-2
                  rounded bg-dark px-3 py-2 text-left text-brand-gold
                  focus:outline-none
                "
              >
                <span>{selectedFrom}</span>
                <ArrowSquareDownIcon className="text-brand-gold" />
              </button>

              {fromOpen && (
                <ul
                  className="
                    absolute left-0 top-[calc(100%+4px)] z-10 w-full
                    rounded border border-white/60  bg-light shadow-lg
                  "
                >
                  {WALLET_OPTIONS.map(opt => (
                    <li
                      key={opt}
                      onClick={() => {
                        setSelectedFrom(opt);
                        setFromOpen(false);
                      }}
                      className="
                        cursor-pointer rounded px-3 py-2 text-sm
                        text-brand-gold transition-all duration-300 hover:bg-dark
                      "
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ─── 2) AMOUNT input ───────────────────────────────────────────── */}
            <div className="flex-1 px-2">
              <input
                type="number"
                placeholder="Enter Amount"
                value={amountValue}
                onChange={e => setAmountValue(e.target.value)}
                className="
                  h-[2.5rem] w-full rounded bg-dark px-3 py-2
                  text-brand-gold placeholder:text-xs placeholder:text-brand-gold
                  focus:outline-none
                "
              />
            </div>

            {/* ─── 3) TO dropdown ─────────────────────────────────────────────── */}
            <div className="relative flex-1 px-2 text-xs">
              <button
                onClick={() => {
                  setToOpen(o => !o);
                  setFromOpen(false);
                }}
                className="
                  flex w-full items-center justify-between gap-2
                  rounded bg-dark px-3 py-2 text-left text-brand-gold
                  focus:outline-none
                "
              >
                <span>{selectedTo}</span>
                <ArrowSquareDownIcon className="text-brand-gold" />
              </button>

              {toOpen && (
                <ul
                  className="
                    absolute left-0 top-[calc(100%+4px)] z-10 w-full
                    rounded border border-white/60  bg-light shadow-lg
                  "
                >
                  {WALLET_OPTIONS.map(opt => (
                    <li
                      key={opt}
                      onClick={() => {
                        setSelectedTo(opt);
                        setToOpen(false);
                      }}
                      className="
                        cursor-pointer rounded px-3 py-2 text-sm
                        text-brand-gold transition-all duration-300 hover:bg-dark
                      "
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Confirm button */}
        <div className="mt-6 flex justify-end">
          <Button
            title="Confirm"
            variant="primary"
            className="rounded-full !px-6 !py-2 text-[10px] capitalize"
            onClick={() => {
              // → Add your confirm logic here
              console.log({
                from: selectedFrom,
                amount: amountValue,
                to: selectedTo,
              });
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminTransferModal;
