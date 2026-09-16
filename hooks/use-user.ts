'use client';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useAuthStore } from '@/stores/auth.store';
import { User } from '@/models/user.model';

interface UseUser {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isDemo: boolean;
  isRewardsEnabled: boolean;
  loading: 'idle' | 'loading' | 'loaded' | 'failed';
}

export const useUser = (): UseUser => {
  const { user, loading } = useAuthStore(
    useShallow(state => ({
      user: state.user,
      loading: state.loading,
    }))
  );

  // Log user role for debugging
  React.useEffect(() => {
    if (user) {
      console.log('[useUser] Current user:', {
        email: user.Email,
        isAdmin: user.is_admin,
        isDemo: user.is_demo,
        isRewardsEnabled: user.is_rewards_enabled,
        sub: user.sub,
      });
    }
  }, [user]);

  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.is_admin === true,
    isDemo: user?.is_demo === true,
    isRewardsEnabled: user?.is_rewards_enabled === true,
    loading,
  };
};

export const useIsAuthenticated = (): boolean => {
  return useAuthStore(useShallow(state => !!state.user));
};

export const useIsAdmin = (): boolean => {
  return useAuthStore(useShallow(state => state.user?.is_admin === true));
};

export const useIsDemo = (): boolean => {
  return useAuthStore(useShallow(state => state.user?.is_demo === true));
};

export const useIsRewardsEnabled = (): boolean => {
  return useAuthStore(useShallow(state => state.user?.is_rewards_enabled === true));
};
