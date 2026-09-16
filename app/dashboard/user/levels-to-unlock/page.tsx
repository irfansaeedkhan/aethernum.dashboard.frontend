'use client';

import { LevelsResponse } from '@/lib/auth/get-levels';
// import { getLevels } from '@/lib/auth/get-levels';
// import { useCallback, useEffect, useState } from 'react';
import { useState } from 'react';
// import { CgSpinner } from 'react-icons/cg';
import { formatNumber } from '@/utils/format-numbers-dash';
import Image from 'next/image';

const LevelsToUnlock = () => {
  // Dummy data for demonstration
  const dummyLevelsData: LevelsResponse = {
    total_weekly_return: 2.5,
    base_weekly_return: 2.0,
    levels: [
      {
        level: 1,
        bonus_percentage: 0.5,
        is_unlocked: true,
        investment_required: 100,
        current_investment: 100,
        description: 'You have met the minimum investment requirement of $100.',
        unlock_message: 'This bonus is now added to your weekly return.',
      },
      {
        level: 2,
        bonus_percentage: 0.5,
        is_unlocked: false,
        investment_required: 500,
        current_investment: 100,
        description: 'Unlock this level by investing at least $500.',
        unlock_message: '',
      },
      {
        level: 3,
        bonus_percentage: 0.5,
        is_unlocked: false,
        investment_required: 2500,
        current_investment: 100,
        description: 'Unlock this level by investing at least $2,500.',
        unlock_message: '',
      },
    ],
  };

  const [levelsData] = useState<LevelsResponse | null>(dummyLevelsData);
  // const [isLoading, setIsLoading] = useState(true);
  // Commented out API call for now - using dummy data
  // const fetchLevels = useCallback(async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await getLevels();
  //     setLevelsData(res);
  //   } catch (error: any) {
  //     console.error('error', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchLevels();
  // }, [fetchLevels]);

  // if (isLoading) {
  //   return (
  //     <div className="fixed inset-0 z-[3000] flex h-full w-full items-center justify-center backdrop-blur-[4px] backdrop-filter">
  //       <CgSpinner className="size-14 mx-auto mt-20 h-14 w-14 shrink-0 animate-spin text-white" />
  //     </div>
  //   );
  // }

  const baseLevel = {
    level: 0,
    bonus_percentage: levelsData?.base_weekly_return ?? 2.0,
    is_unlocked: true,
    investment_required: 0,
    description: 'Automatically active for all users',
    unlock_message: 'Automatically active for all users',
  };

  const allLevels = levelsData ? [baseLevel, ...levelsData.levels] : [baseLevel];

  return (
    <div className="z-10 flex flex-col gap-6">
      <div className="rounded-xl bg-light p-6 text-white z-10">
        <h2 className="text-2xl font-bold text-white md:text-3xl">Your Weekly Earnings Overview</h2>
        <p className="pt-2 text-base text-white md:text-xl">
          Here&apos;s a summary of your current weekly returns and available bonus levels.
        </p>

        <div className="mt-6 flex flex-col gap-6 xl:flex-row lg:gap-8 h-full">
          <div className="flex flex-1 flex-col gap-3 justify-center items-center bg-light p-4 md:p-6">
            <div className="flex items-center gap-10 xl:gap-20">
              <Image
                src="/images/calender.svg"
                alt="Calendar icon"
                width={139}
                height={139}
                className="shrink-0 w-20 md:w-36"
                unoptimized
              />
              <div className="flex flex-col gap-1">
                <p className="text-xl md:text-3xl font-bold text-white">Total Weekly Return</p>
                <p className="text-xs md:text-sm text-white">Automatically active for all users</p>
                <p className="text-2xl font-bold text-brand-gold md:text-5xl">
                  {levelsData?.total_weekly_return?.toFixed(1) ?? '2.5'}%
                </p>
              </div>
            </div>
          </div>


          <div className="flex flex-1 flex-col gap-4 lg:border-l-2 lg:border-brand-gold lg:pl-8">
            <h3 className="text-xl font-bold text-white md:text-3xl">Levels Summary Table</h3>
            <div className="flex flex-col gap-3">
              {allLevels.map((level, index) => {
                const isGradientPercentage = index < 2;
                const isBaseLevel = level.level === 0;
                
                return (
                  <div key={index} className="grid grid-cols-[1fr_auto_1fr] gap-x-4 items-center">
                    <p className="text-sm md:text-xl font-bold text-white text-left">
                      {level.level === 0 ? 'Base Weekly Return' : `Level ${level.level} Bonus`}
                    </p>
                    <p className={`text-base md:text-3xl font-bold ${isGradientPercentage ? 'text-gradient' : 'text-[#666666]'} text-center`}>
                      +{level.bonus_percentage.toFixed(1)}%
                    </p>
                    <p
                      className={`${isBaseLevel ? 'text-xs md:text-sm' : 'text-base md:text-3xl'} font-bold ${
                        isBaseLevel
                          ? 'text-gradient uppercase'
                          : level.is_unlocked
                            ? 'text-[#77C646]'
                            : 'text-brand-red'
                      } text-right`}
                    >
                      {isBaseLevel
                        ? 'AUTOMATICALLY ACTIVE FOR ALL USERS'
                        : level.is_unlocked
                          ? 'Unlocked'
                          : 'Locked'}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {levelsData?.levels.map((level) => (
          <div
            key={level.level}
            className="rounded-xl border border-white/10 bg-light p-6 text-white z-10"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-bold text-white md:text-4xl">Level {level.level}</h3>
                    <p className="text-base text-white md:text-2xl">{level.description}</p>
                    {!level.is_unlocked && level.current_investment !== undefined && (
                      <p className="text-xl md:text-3xl font-bold text-[#666666]">
                        You still need ${formatNumber(level.investment_required - level.current_investment)} to unlock this bonus.
                      </p>
                    )}
                    {level.is_unlocked && level.unlock_message && (
                      <p className="text-xl md:text-3xl font-bold text-brand-gold">{level.unlock_message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p
                  className={`text-xl md:text-3xl font-bold ${
                    level.is_unlocked ? 'text-[#77C646]' : 'text-brand-red'
                  }`}
                >
                  {level.is_unlocked ? 'Unlocked' : 'Locked'}
                </p>
                <button
                  disabled={!level.is_unlocked}
                  className={`rounded-lg border px-6 py-2 text-xl md:text-4xl font-bold ${
                    level.is_unlocked
                      ? 'bg-gradient-to-r from-[#FFAA21] to-[#933C1F] border-[#77C646] text-white'
                      : 'bg-[#293132] text-[#666] border-[#FF3235]'
                  }`}
                >
                  +{level.bonus_percentage.toFixed(1)}%
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelsToUnlock;
