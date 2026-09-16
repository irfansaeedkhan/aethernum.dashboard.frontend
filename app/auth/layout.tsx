'use client';

import React from 'react';
import Image from 'next/image';
import { LayoutComponent } from '@/components/auth/layout-component';
import { ArrowDownIcon } from '@/assets/svgs';
import { AppRoutes } from '@/constants/app-routes';
import { useRouter } from 'next/navigation';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <>
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute left-0 top-0 flex h-20 items-center pl-6 lg:pl-12">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={178}
            height={34}
            unoptimized
            className="flex-shrink-0 cursor-pointer object-cover"
            onClick={() => router.push(AppRoutes.dashboard.index)}
          />
        </div>
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
        <div className="flex w-full lg:w-[85%]">
          <LayoutComponent />
          <div className="relative z-10 flex w-full flex-col lg:w-1/2">
            <div className="flex h-24 items-center justify-between px-6 sm:px-12 md:hidden lg:justify-end">
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
            <div className="flex h-full items-center justify-center lg:h-[calc(100vh-80px)]">
              {children}
            </div>
          </div>
        </div>{' '}
      </section>
    </>
  );
}
