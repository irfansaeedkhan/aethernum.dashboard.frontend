'use client';
import React, { useContext } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { AppRoutes } from '@/constants/app-routes';
import { SidebarContext } from '../../../dashboard/sidebar-context';
import { BurgerIcon } from '@/assets/svgs';

export const AdminHeader = ({ toggle, setToggle }: any) => {
  const { isOpen, setIsOpen } = useContext(SidebarContext);

  const router = useRouter();
  const pathname = usePathname();
  let path = pathname.split('/').pop();

  if (path === '') {
    path = 'Dashboard';
  } else if (path?.includes('-')) {
    path = path?.split('-').join(' ');
    path = path!.charAt(0).toUpperCase() + path!.slice(1);
    // also capitalize next word first letter
    const index = path.indexOf(' ');
    path = path.slice(0, index + 1) + path.charAt(index + 1).toUpperCase() + path.slice(index + 2);
  } else {
    path = path!.charAt(0).toUpperCase() + path!.slice(1);
  }

  const handleClick = () => {
    setToggle((prev: any) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen: setIsOpen }}>
      <div className="bg-transparent backdrop-blur-sm">
        <div className=" flex w-full items-center justify-between px-4 py-3 pt-6 md:hidden">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={107}
            height={36}
            unoptimized
            className="flex-shrink-0 object-cover"
            onClick={() => router.push(AppRoutes.dashboard.index)}
          />
          <button className="" onClick={handleClick}>
            <BurgerIcon />
          </button>
          <button
            type="button"
            className="text-xs font-medium text-brand-gold underline"
            onClick={() => router.push(AppRoutes.dashboard.index)}
          >
            User view
          </button>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};
