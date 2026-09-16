import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { LogoLink } from '@/components/shared';
import { ArrowDownIcon } from '@/assets/svgs';

export default function AuthLayoutWithoutBackground({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="flex min-h-screen w-full">
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
          <div className="relative flex h-[calc(100vh-80px)] items-center justify-center overflow-hidden">
            {children}

            <div
              className="pointer-events-none absolute bottom-[-15%] left-[28%] z-0 h-[55vh] w-[70vw] rounded-full"
              style={{
                background: 'radial-gradient(closest-side, rgba(255,170,33,0.35), rgba(255,170,33,0) 70%)',
              }}
            />
            <div
              className="pointer-events-none absolute bottom-[-15%] right-[28%] z-0 h-[55vh] w-[70vw] rounded-full"
              style={{
                background: 'radial-gradient(closest-side, rgba(147,60,31,0.40), rgba(147,60,31,0) 70%)',
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
