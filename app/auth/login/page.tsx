'use client';
import React from 'react';
import Link from 'next/link';
import { LoginForm } from '@/components/auth/login/login-form';
import { AppRoutes } from '@/constants/app-routes';

const Login = () => {
  return (
    <div className="flex w-full flex-col gap-12">
      <div className="flex flex-col items-center justify-center gap-3">
        <h2 className="text-gradient font-kanit text-[1.85rem] font-normal leading-[2.62rem]">
          Welcome Back
        </h2>
        <span className="font-nexa text-sm font-normal text-white">
          Log in with your credentials{' '}
        </span>
      </div>
      <div className="mx-auto w-full max-w-[566px] px-6">
        <LoginForm />
      </div>
      {/* Round 1 demo box: the dashboard ships with an in-repo demo
          login (demo@aethernum.local, see lib/mock-data.ts), but the
          login page never said so, and registration stays gated behind
          a referral code. This box is the public demo path; it does not
          change the referral requirement for real registrations. */}
      <div className="mx-auto w-full max-w-[566px] px-6">
        <div className="rounded-2xl border border-white/15 bg-white/5 p-4 text-sm text-white">
          <p className="font-semibold text-brand-gold">Try the demo</p>
          <p className="mt-1 text-white/80">
            Demo account: <span className="font-semibold text-white">demo@aethernum.local</span>
            <br />
            Sign in with the demo email and any password in this demo.
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-0.5 text-sm text-white md:text-base">
        <span className="text-white/80">New to Aethernum? </span>{' '}
        <Link
          href={AppRoutes.auth.register}
          className="cool-link ml-[2px] cursor-pointer text-brand-gold"
        >
          {' '}
          Create Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
