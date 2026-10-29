import { Button } from '@/components/shared';
import { AdminAppRoutes, AppRoutes } from '@/constants/app-routes';
import { getAuthTokens } from '@/lib/auth/client-auth-tokens';
import { useAuthStore } from '@/stores/auth.store';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { CgSpinner } from 'react-icons/cg';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { useShallow } from 'zustand/react/shallow';
import { VerifyAccountPopup } from './verify-account-popup';

interface IFormInput {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [verifyAccount, setVerifyAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore(useShallow(state => state.actions));

  // Round 2: the email pattern capped the domain suffix at 4 letters,
  // so demo@aethernum.local ("local" is 5 letters) always failed
  // validation with "Invalid email address" and LOGIN stayed disabled,
  // even though the demo box promises that account works. The suffix
  // cap is removed (2+ letters), so the demo address and other long
  // suffixes pass, while malformed addresses still fail.
  // Round 1: the submit button is disabled while fields are empty, but
  // nothing said so. Show exactly what is still missing instead of a
  // dead button with no explanation.
  const emailValue = watch('email') ?? '';
  const passwordValue = watch('password') ?? '';
  const missingFields = [
    ...(emailValue === '' ? ['email'] : []),
    ...(passwordValue === '' ? ['password'] : []),
  ];
  const loginHint =
    missingFields.length > 0
      ? `Enter your ${missingFields.join(' and ')} to log in.`
      : null;

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    setErrorMessage('');
    setIsLoading('loading');
    if (data.email === '' || data.password === '') {
      setErrorMessage('Email and Password are required');
      setIsLoading('loaded');
      return;
    }

    try {
      await login(data.email, data.password);
      toast.success('Logged in successfully');
      setIsLoading('loaded'); // Set loading to loaded after successful login

      // Check user role and redirect accordingly
      setTimeout(() => {
        const tokens = getAuthTokens();
        if (tokens) {
          try {
            const payload = JSON.parse(atob(tokens.access_token.split('.')[1]));

            if (payload.is_admin === true) {
              router.push(AdminAppRoutes.dashboard.index);
            } else {
              router.push(AppRoutes.dashboard.index);
            }
          } catch (error) {
            console.error('[Login] Error decoding token:', error);
            router.push(AppRoutes.dashboard.index);
          }
        } else {
          console.log('[Login] No tokens found, redirecting to user dashboard');
          router.push(AppRoutes.dashboard.index);
        }
      }, 100);
    } catch (error: any) {
      setIsLoading('loaded');
      // toast.error(error.message);
      setErrorMessage(error.message);
      if (error.message === 'complete email verification first') {
        setVerifyAccount(true);
        setErrorMessage(' ');
      }
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={clsx(inputMain, 'gap-4')}>
          <div className={inputMain}>
            <input
              autoComplete="off"
              {...register('email', {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              className={clsx(inputField, errors.email && '!border-brand-red')}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-xs font-medium text-brand-red">
                {errors.email.type === 'required' ? 'Email is required' : 'Invalid email address'}
              </p>
            )}
          </div>
          <div className={inputMain}>
            <div
              className={clsx(
                'flex items-center',
                passwordField,
                errors.password && '!border-brand-red'
              )}
            >
              <input
                autoComplete="off"
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: true })}
                className="w-full flex-grow bg-transparent focus:outline-none focus:ring-0"
                placeholder="Password"
              />
              <span
                className="size-5 flex h-5 w-5 flex-shrink-0 shrink-0 cursor-pointer items-center justify-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaRegEye className="size-[18px]" />
                ) : (
                  <FaRegEyeSlash className="size-[18px]" />
                )}
              </span>
            </div>
          </div>
          <div className="flex w-full justify-end">
            <Link
              href={AppRoutes.passwords.forgot_password}
              className="cool-link text-base text-brand-gold"
            >
              Forgot Password?
            </Link>
          </div>
          <span className="text-xs text-brand-red">{errorMessage}</span>
          {loginHint && (
            <p className="text-xs text-white/70" role="status">
              {loginHint}
            </p>
          )}
          <Button
            type="submit"
            title="Login"
            loaderIcon={
              isLoading === 'loading' && (
                <CgSpinner className="size-5 mx-auto h-5 w-5 shrink-0 animate-spin" />
              )
            }
            disabled={
              errors.email ||
              errors.password ||
              watch('email') === '' ||
              watch('password') === '' ||
              isLoading === 'loading'
                ? true
                : false
            }
            className="mt-4 text-sm md:text-base"
          />
        </div>
      </form>
      <VerifyAccountPopup
        email={watch('email')}
        open={verifyAccount}
        onClose={() => setVerifyAccount(false)}
      />
    </div>
  );
};

const inputMain = 'flex flex-col';
const inputField =
  'peer relative w-full bg-light pl-6 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:light focus:ring-2 focus:ring-light focus:drop-shadow-lg py-3 rounded-full text-base text-white';
const passwordField =
  'peer relative w-full bg-light pl-6 pr-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:light focus:ring-2 focus:ring-light focus:drop-shadow-lg py-3 rounded-full  text-base text-white';
