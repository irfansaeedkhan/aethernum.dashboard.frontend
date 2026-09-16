import { ETHIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import { getAutoReinvest } from '@/lib/auth/get-auto-reinvest';
import { GetAvailableBalanceResponse } from '@/lib/auth/get-available-balance';
import { updateAutoReinvest } from '@/lib/auth/update-auto-reinvest';
import cn from '@/utils/cn';
import { formatNumber } from '@/utils/format-numbers-dash';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ReinvestInfoIconWithTooltip from '../shared/reinvest-info-icon-tooltip';

interface Props {
  availableBalance: GetAvailableBalanceResponse | null | undefined;
  onOpen: () => void;
  onOpenWithdrawalModal: () => void;
  onOpenRewardListModal: () => void;
  isDemo: boolean;
}

const AvailableBalanceActionButtons: React.FC<Props> = ({
  availableBalance,
  onOpenWithdrawalModal,
  onOpenRewardListModal,
  onOpen,
  isDemo,
}) => {
  let balanceDisplay: number | string = 'N/A';
  let balanceDisplayInUSD: number | string = 'N/A';
  if (availableBalance?.balance !== undefined && availableBalance?.balance !== null) {
    balanceDisplay = `${Math.abs(availableBalance.balance).toFixed(2)}`;
    balanceDisplayInUSD = formatNumber(Math.abs(availableBalance.balanceInUSD));
  } else {
    balanceDisplay = 'N/A';
    balanceDisplayInUSD = 'N/A';
  }

  // Auto-Reinvest state
  const [autoReinvest, setAutoReinvest] = useState<boolean>(false);
  const [autoReinvestLoading, setAutoReinvestLoading] = useState<boolean>(false);
  const [autoReinvestInit, setAutoReinvestInit] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setAutoReinvestLoading(true);
        const res = await getAutoReinvest();
        if (mounted) setAutoReinvest(res.isAutoReinvestEnabled);
      } catch (e: any) {
        toast.error(e.message || 'Failed to fetch auto-reinvest status');
      } finally {
        if (mounted) {
          setAutoReinvestLoading(false);
          setAutoReinvestInit(false);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleToggleAutoReinvest = async () => {
    setAutoReinvestLoading(true);
    try {
      const res = await updateAutoReinvest(!autoReinvest);
      setAutoReinvest(res.isAutoReinvestEnabled);
      toast.success(res.isAutoReinvestEnabled ? 'Auto-Reinvest enabled' : 'Auto-Reinvest disabled');
    } catch (e: any) {
      toast.error(e.message || 'Failed to update auto-reinvest');
    } finally {
      setAutoReinvestLoading(false);
    }
  };

  const ToggleSwitch = () => (
    <button
      type="button"
      className={` relative h-[1.375rem] w-10 rounded-full transition-colors duration-300 focus:outline-none
        ${autoReinvest ? 'bg-white' : 'bg-[#181F20]'} border border-white`}
      onClick={handleToggleAutoReinvest}
      disabled={autoReinvestLoading || autoReinvestInit}
      aria-checked={autoReinvest}
      role="switch"
    >
      <span
        className={`absolute left-[0.045rem] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full shadow-md transition-transform duration-300
          ${autoReinvest ? 'translate-x-5 bg-gradient-pattern' : 'translate-x-[0.188rem] bg-white'}
          ${autoReinvestLoading ? 'opacity-60' : ''}
        `}
      />
    </button>
  );

  return (
    <div className="w-full rounded-xl bg-light p-6 text-white  lg:max-w-[30%]">
      <div className="flex flex-col justify-between gap-2">
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Available Balance</p>
            <div className="flex flex-wrap items-center justify-start gap-2 text-xl text-brand-gold">
              <ETHIcon className="size-6 h-6 w-6 shrink-0 text-center" />
              <span className="flex items-center justify-center">
                {balanceDisplay}
                <span className="ml-1 mt-1 text-center text-xs"> ETH</span>
              </span>
              <span className="flex items-center justify-center text-sm text-white">
                <span className="mr-1">(</span>~{balanceDisplayInUSD}
                <span className="ml-1 text-center text-xs"> USD </span>
                <span className="ml-1">)</span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 pt-3">
          <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-1 xl:grid-cols-2">
            {' '}
            <div className="relative w-full">
              <Button
                title="Withdraw"
                variant="primary"
                className={cn(
                  'w-full lg:!px-6 lg:!py-2',
                  isDemo ? 'cursor-not-allowed !opacity-30' : ''
                )}
                onClick={!isDemo ? onOpenWithdrawalModal : undefined}
                disabled={isDemo}
              />
            </div>
            <Button
              title="Reward List"
              variant="primary"
              className="w-full lg:!px-6 lg:!py-2"
              onClick={onOpenRewardListModal}
            />
          </div>
          <Button
            title="Deposit Address"
            variant="underline"
            className="w-full text-xs capitalize lg:!px-6 lg:!py-2"
            onClick={onOpen}
          />
        </div>
      </div>
      <hr className="border-gray-800 mx-auto w-[80%]" />

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-xs font-medium">Auto-Reinvest Option</p>
          <ToggleSwitch />
        </div>
        <ReinvestInfoIconWithTooltip
          text="When enabled, your weekly earnings are automatically added to your existing Sigillum."
          color="#FFFFFF"
        />
      </div>
    </div>
  );
};

export default AvailableBalanceActionButtons;
