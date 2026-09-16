import React from 'react';
import Link from 'next/link';
import { AppRoutes } from '@/constants/app-routes';
import { Button } from '@/components/shared';
import Image from 'next/image';

interface Props {
  title: string;
  description: string;
}

const EmailSent: React.FC<Props> = ({ title, description }) => {
  return (
    <div className="flex w-full max-w-[566px] flex-col gap-12 px-6 text-center">
      <Image
        src="/images/mail-sent.png"
        alt="email sent"
        width={145}
        height={119}
        className="mx-auto object-cover"
      />
      <div className="flex flex-col items-center justify-center gap-3">
        <h2 className="text-gradient font-kanit text-[1.85rem] font-normal leading-[2.62rem]">
          {title}
        </h2>
        <span className="font-nexa text-sm font-normal text-white">{description}</span>
      </div>

      <Link href={AppRoutes.auth.login} className="w-full">
        <Button type="submit" title="Go to login" className="mt-4 w-full text-sm md:text-base" />
      </Link>
    </div>
  );
};

export default EmailSent;
