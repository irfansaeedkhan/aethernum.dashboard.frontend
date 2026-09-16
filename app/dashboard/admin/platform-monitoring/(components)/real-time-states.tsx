import {
  AdminTransactionManagementIcon,
  AwardIcon,
  MenuBoardIcon,
  RepeatIcon,
  PeopleIcon,
  UserTickIcon,
  VerticalLineIcon,
  DangerIcon,
} from '@/assets/svgs';
import React, { useState } from 'react';

const RealTimeStates = () => {
  const [activeTabs, setActiveTabs] = useState('Daily');
  return (
    <>
      <div className="flex flex-col gap-6 rounded-xl  sm:flex-row ">
        {/* Active Users Card */}
        <div className="relative flex w-full flex-col rounded-2xl bg-light p-4 px-8  sm:w-1/2">
          <h5 className="text-gradient mb-2 text-start font-kanit text-white">Active Users</h5>
          <div className="flex items-center gap-4 rounded-lg bg-light p-4">
            <PeopleIcon />
            <h1 className="text-3xl  text-brand-mint">125,121</h1>
          </div>
          <div className="absolute right-3 top-4">
            <VerticalLineIcon />
          </div>
        </div>

        {/* New Users Card */}
        <div className="relative flex flex-col rounded-2xl bg-light p-4 px-8 sm:w-1/2">
          <div className="flex items-start justify-between">
            <h5 className=" text-gradient font-kanit">New Users</h5>
            <ul className="flex gap-14 px-4 text-sm ">
              {['Daily', 'Weekly', 'Monthly'].map(tab => (
                <li
                  key={tab}
                  className={` cursor-pointer pb-1 ${
                    activeTabs === tab ? 'border-green border-b-2 text-brand-mint ' : 'text-white'
                  }`}
                  onClick={() => setActiveTabs(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex items-center gap-4 rounded-lg bg-light p-4">
            <PeopleIcon />
            <h1 className="text-3xl  text-brand-mint">125</h1>
          </div>
          <div className="absolute right-3 top-4">
            <VerticalLineIcon />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 rounded-xl  sm:flex-row">
        {/* Active Users Card */}
        <div className="relative flex flex-col rounded-2xl bg-light p-4 px-8 sm:w-1/2">
          <div className="flex items-start justify-between">
            <h5 className=" text-gradient font-kanit">Compeleted Transaction</h5>
            <ul className="flex gap-14 px-4 text-sm ">
              {['Daily', 'Weekly', 'Monthly'].map(tab => (
                <li
                  key={tab}
                  className={` cursor-pointer pb-1 ${
                    activeTabs === tab ? 'border-green border-b-2 text-brand-mint ' : 'text-white'
                  }`}
                  onClick={() => setActiveTabs(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex items-center gap-4 rounded-lg bg-light p-4">
            <RepeatIcon />
            <h1 className="text-3xl  text-brand-mint">203</h1>
          </div>
          <div className="absolute right-3 top-4">
            <VerticalLineIcon />
          </div>
        </div>

        {/* New Users Card */}
        <div className="relative flex flex-col rounded-2xl bg-light p-4 px-8 sm:w-1/2">
          <div className="flex items-start justify-between">
            <h5 className=" text-gradient font-kanit">Failed Transaction</h5>
            <ul className="flex gap-14 px-4  text-sm ">
              {['Daily', 'Weekly', 'Monthly'].map(tab => (
                <li
                  key={tab}
                  className={` cursor-pointer pb-1 ${
                    activeTabs === tab
                      ? 'border-green border-b-2   text-brand-mint '
                      : 'text-white  '
                  }`}
                  onClick={() => setActiveTabs(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex items-center gap-4 rounded-lg bg-light p-4">
            <DangerIcon />
            <h1 className="text-3xl  text-[#CE0000]">32</h1>
          </div>
          <div className="absolute right-3 top-4">
            <VerticalLineIcon />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 rounded-xl  sm:flex-row">
        {/* Active Users Card */}
        <div className="relative flex flex-col rounded-2xl bg-light p-4 px-8 sm:w-1/2">
          <div className="flex items-start justify-between">
            <h5 className=" text-gradient font-kanit">Rewards Payed</h5>
            <ul className="flex gap-14 px-4 text-sm ">
              {['Daily', 'Weekly', 'Monthly'].map(tab => (
                <li
                  key={tab}
                  className={` cursor-pointer pb-1 ${
                    activeTabs === tab ? 'border-green border-b-2 text-brand-mint ' : 'text-white'
                  }`}
                  onClick={() => setActiveTabs(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex items-center gap-4 rounded-lg bg-light p-4">
            <AwardIcon />
            <h1 className="text-3xl  text-brand-mint">67</h1>
          </div>
          <div className="absolute right-3 top-4">
            <VerticalLineIcon />
          </div>
        </div>

        {/* New Users Card */}
        <div className="relative flex flex-col rounded-2xl bg-light p-4 px-8 sm:w-1/2">
          <div className="flex items-start justify-between">
            <h5 className=" text-gradient font-kanit">Significant Events</h5>
            <ul className="flex gap-14 px-4  text-sm ">
              {['Daily', 'Weekly', 'Monthly'].map(tab => (
                <li
                  key={tab}
                  className={` cursor-pointer pb-1 ${
                    activeTabs === tab
                      ? 'border-green border-b-2   text-brand-mint '
                      : 'text-white  '
                  }`}
                  onClick={() => setActiveTabs(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex items-center gap-4 rounded-lg bg-light p-4">
            <div>
              <MenuBoardIcon />
            </div>
            <h1 className="text-3xl  text-brand-mint">21</h1>
          </div>
          <div className="absolute right-3 top-4">
            <VerticalLineIcon />
          </div>
        </div>
      </div>
      {/* New 2nd last card */}
      <div className="flex flex-col gap-6 rounded-xl  sm:flex-row">
        <div className="flex w-full flex-col rounded-2xl bg-light p-4 sm:w-full">
          <div className="flex items-start justify-between">
            <h5 className=" text-gradient font-kanit">Rewards payed</h5>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 px-2 pt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ">
            <div className="flex flex-1 flex-col items-start gap-4 rounded-lg bg-light p-4">
              <p className="bg-gradient text-sm text-white">Main</p>
              <h1 className="text-3xl  text-brand-mint">$256,250</h1>
            </div>
            <div className="flex flex-1 flex-col items-start gap-4 rounded-lg bg-light p-4">
              <p className="bg-gradient text-sm text-white">Rewards </p>
              <h1 className="text-3xl  text-brand-mint">$ 56,220</h1>
            </div>{' '}
            <div className="flex flex-1 flex-col items-start gap-4 rounded-lg bg-light p-4">
              <p className="bg-gradient text-sm text-white">Commissions </p>
              <h1 className="text-3xl  text-brand-mint">$ 32,550</h1>
            </div>{' '}
            <div className="flex flex-1 flex-col items-start gap-4 rounded-lg bg-light p-4">
              <p className="bg-gradient text-sm text-white">Income </p>
              <h1 className="text-3xl  text-brand-mint">$ 1,020,515</h1>
            </div>{' '}
            <div className="flex flex-1 flex-col items-start gap-4 rounded-lg bg-light p-4">
              <p className="bg-gradient text-sm text-white">Users</p>
              <h1 className="text-3xl  text-brand-mint">$ 89,000</h1>
            </div>
          </div>
        </div>
      </div>

      {/* New last card */}
      <div className="flex flex-col gap-6 rounded-xl  sm:flex-row">
        <div className="relative flex w-full flex-col rounded-2xl bg-light p-4 px-8 sm:w-1/2">
          <div className="flex items-start justify-between">
            <h5 className=" text-gradient font-kanit">KYC Compeletions</h5>
            <ul className="flex  gap-14 px-4 text-sm ">
              {['Daily', 'Weekly', 'Monthly'].map(tab => (
                <li
                  key={tab}
                  className={` cursor-pointer pb-1 ${
                    activeTabs === tab ? 'border-green border-b-2 text-brand-mint ' : 'text-white'
                  }`}
                  onClick={() => setActiveTabs(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 flex items-center gap-4 rounded-lg bg-dark p-4">
            <UserTickIcon />
            <h1 className="text-3xl  text-brand-mint">67</h1>
          </div>
          <div className="absolute right-3 top-4">
            <VerticalLineIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default RealTimeStates;
