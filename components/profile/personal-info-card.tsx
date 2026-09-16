import React, { useState } from 'react';

import { EditPenIcon, EmailIcon, GlobeIcon, PhoneIcon, UserIcon } from '@/assets/svgs';
import { PersonalInfoModal } from './personal-info-modal';

type PersonalInfoProps = {
  Name?: string;
  Email?: string;
  Phone?: string;
  Country?: string;
  Surname?: string;
};

const PersonalInfoCard: React.FC<PersonalInfoProps> = ({
  Name = 'N/a',
  Email = 'N/a',
  Phone = 'N/a',
  Country = 'N/a',
  Surname = 'N/a',
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full rounded-xl bg-light p-4 text-white lg:p-6">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-lg tracking-[-0.28px] text-white lg:text-xl">Personal information</h2>
        <button onClick={() => setOpen(true)}>
          <EditPenIcon className="size-6 h-6 w-6 shrink-0 cursor-pointer text-white" />
        </button>
      </div>
      <div className="-ml-2 flex w-full flex-col gap-4 pt-4">
        <div className="flex items-center gap-2">
          <div className="size-11 flex flex-shrink-0 items-center justify-center rounded-full bg-transparent">
            <EmailIcon />
          </div>
          <div className="flex w-full flex-col gap-1">
            <h3 className="text-xs tracking-[-0.28px] text-gray">Email</h3>
            <div className="flex w-full flex-wrap items-center justify-between gap-5">
              <p className="cursor-pointer overflow-hidden text-xs font-normal text-white lg:text-sm">
                {Email}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-11 flex flex-shrink-0 items-center justify-center rounded-full bg-transparent">
            <UserIcon />
          </div>
          <div className="flex w-full flex-col gap-1">
            <h3 className="text-xs tracking-[-0.28px] text-gray">Name</h3>
            <div className="flex w-full flex-wrap items-center justify-between gap-5">
              <p className="cursor-pointer overflow-hidden text-xs font-normal text-white lg:text-sm">
                {Name} {Surname}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-11 flex flex-shrink-0 items-center justify-center rounded-full bg-transparent">
            <GlobeIcon />
          </div>
          <div className="flex w-full flex-col gap-1">
            <h3 className="text-xs tracking-[-0.28px] text-gray">Country</h3>
            <div className="flex w-full flex-wrap items-center justify-between gap-5">
              <p className="cursor-pointer overflow-hidden text-xs font-normal text-white lg:text-sm">
                {Country}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-11 flex flex-shrink-0 items-center justify-center rounded-full bg-transparent">
            <PhoneIcon />
          </div>
          <div className="flex w-full flex-col gap-1">
            <h3 className="text-xs tracking-[-0.28px] text-gray">Phone Number</h3>
            <div className="flex w-full flex-wrap items-center justify-between gap-5">
              <p className="cursor-pointer overflow-hidden text-xs font-normal text-white lg:text-sm">
                {Phone}
              </p>
            </div>
          </div>
        </div>
      </div>
      <PersonalInfoModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default PersonalInfoCard;
