import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { LogoLink } from '@/components/shared';
import { ArrowDownIcon } from '@/assets/svgs';

export default function AuthLayoutWithoutBackground({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="relative flex min-h-screen w-full overflow-hidden">
        <div
          className="pointer-events-none absolute bottom-[-15%] left-[28%] z-0 h-[55vh] w-[70vw] rounded-full"
          style={{
            background: 'radial-gradient(closest-side, rgba(0,163,255,0.35), rgba(0,163,255,0) 70%)',
          }}
        />
        <div
          className="pointer-events-none absolute bottom-[-15%] right-[28%] z-0 h-[55vh] w-[70vw] rounded-full"
          style={{
            background: 'radial-gradient(closest-side, rgba(255,170,33,0.35), rgba(255,170,33,0) 70%)',
          }}
        />
        <div className="flex w-full flex-col">
          <div className="flex h-20 items-center justify-between px-6 sm:px-12">
            <LogoLink />
            <div className="--flex hidden items-center gap-2">
              <Image
                src="/images/british_flag.png"
                alt="flag"
                width={33}
                height={22}
                className="flex-shrink-0"
              />
              <ArrowDownIcon />
            </div>
          </div>
          <div className="flex h-[calc(100vh-80px)] items-center justify-center">
            <div className="flex h-auto min-h-screen w-full items-center justify-center">
              <div className="border-black-shade-1/[12%] mx-4 flex w-full max-w-[566px] flex-col items-center gap-8 rounded-3xl border p-8 sm:mx-0">
                <Image
                  src="/images/mail-sent.png"
                  alt="email sent"
                  width={145}
                  height={119}
                  className="mx-auto object-cover"
                />
                {children}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
