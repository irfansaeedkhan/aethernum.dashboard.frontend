'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AppRoutes } from '@/constants/app-routes';

export const RedirectMainPage = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (pathname === '/') {
        router.replace(AppRoutes.dashboard.index);
      }
    }
  }, [pathname, router]);
  return null;
};
