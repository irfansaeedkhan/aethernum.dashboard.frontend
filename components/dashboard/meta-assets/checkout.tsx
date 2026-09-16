'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

import { Button } from '@/components/shared';
import { AppRoutes } from '@/constants/app-routes';

const CheckoutPage = ({
  onPaymentSuccess,
  clientSecret,
}: {
  onPaymentSuccess: () => void;
  clientSecret: string | undefined;
}) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckbox(e.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!clientSecret) {
      return (
        <div className="flex h-full flex-1 items-center justify-center">
          <div
            className="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      );
    }

    await new Promise(resolve => setTimeout(resolve, 300));
    onPaymentSuccess();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {clientSecret && (
        <>
          <div className="rounded-xl bg-light p-4 text-sm text-gray">
            Demo checkout is ready. Your local payment will be recorded immediately.
          </div>
          <div className="flex items-start gap-2 pt-4 md:items-center">
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              checked={checkbox}
              onChange={handleCheckboxChange}
              className="border-gray-shade-1/10 block h-5 w-5 rounded border bg-light focus:ring-0"
            />
            <label htmlFor="checkbox" className="mt-1 block text-xs font-normal text-white">
              By proceeding the the purchase of Sigillum, you agree to aethernum&apos;s{' '}
              <Link href={AppRoutes.profile.terms} className="font-semibold underline">
                Terms and conditions
              </Link>
            </label>
          </div>
          <Button
            title="Pay now"
            className="mt-4 w-full text-sm md:text-base"
            loaderIcon={
              loading && <CgSpinner className="size-5 mx-auto h-5 w-5 shrink-0 animate-spin" />
            }
            disabled={!checkbox || loading}
            type="submit"
          />
        </>
      )}
    </form>
  );
};

export default CheckoutPage;
