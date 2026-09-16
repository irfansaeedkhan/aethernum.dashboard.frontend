'use client';

import { addWeeks } from 'date-fns';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

import { ExclaimationIcon, GradientCancelIcon, GradientCheckIcon, LockIcon } from '@/assets/svgs';
import { Button } from '@/components/shared';
import ModalContainer from '@/components/shared/modal-container';
import { SigillumDetailsResponse } from '@/lib/auth/get-meta-asset-details';
import { formatDisplayDate, toValidDate } from '@/utils/format-display-date';

import { getClientSecret } from '@/lib/auth/get-client-secret';
import dayjs from 'dayjs';
import CheckoutPage from './checkout';

interface Props {
  open: boolean;
  onClose: () => void;
  mainModelClose: () => void;
  numberOfUnits: number;
  id: string;
  totalamount: number;
  singleamount: number;
  StartDate: string;
  duration: number;
  setSuccessPurchase: any;
  SigillumDetails: SigillumDetailsResponse | null | undefined;
}

export const CreateOrderUsingCardModal: React.FC<Props> = ({
  open,
  onClose,
  mainModelClose,
  totalamount,
  singleamount,
  numberOfUnits,
  duration,
  StartDate,
  setSuccessPurchase,
  SigillumDetails,
}) => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | undefined>(undefined);

  // Convert the string to a Date object
  const startDate = toValidDate(StartDate);
  const endDate = startDate && Number.isFinite(duration) ? addWeeks(startDate, duration) : null;
  const formattedEndDateForFirstPurchase = formatDisplayDate(endDate);
  const finalExpiraryDate = SigillumDetails?.contract_expiry_date
    ? formatDisplayDate(SigillumDetails.contract_expiry_date, formattedEndDateForFirstPurchase)
    : formattedEndDateForFirstPurchase;

  const handlePaymentSuccess = () => {
    setSuccess(true);
    setSuccessPurchase(true);
  };
  const handleClose = () => {
    onClose();
    mainModelClose();
    setFailure(false);
    setSuccess(false);
    setClientSecret(undefined);
    setSuccessPurchase(false);
  };

  const tryAgain = () => {
    setSuccess(false);
    setFailure(false);
    setClientSecret(undefined);
    fetchClientSecret();
  };

  const fetchClientSecret = async () => {
    try {
      const data = await getClientSecret(totalamount);
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        console.error('No client secret returned:', data);
      }
    } catch (error) {
      console.error('Error fetching client secret:', error);
    }
  };

  useEffect(() => {
    if (totalamount > 0) {
      fetchClientSecret();
    }
  }, [totalamount]);

  if (success) {
    return (
      <ModalContainer
        modalId="create-order-modal-success"
        isOpen={open}
        onClose={handleClose}
        modalContentClassName="h-auto rounded-xl w-full md:max-w-max md:!px-20"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
      >
        <div className="flex w-full flex-col">
          <div className="flex flex-col items-center gap-6 text-center">
            <GradientCheckIcon />
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-gradient text-lg md:text-xl">Payment successful</h3>
              <p className="max-w-[40ch] text-sm text-gray">
                Your payment has been successfully processed. You will receive a confirmation email
                shortly. Thank you for your purchase!
              </p>
            </div>
            <div className="mt-4 flex w-full flex-col gap-2">
              <Button
                title="Back to home"
                className="w-full text-sm md:text-base"
                onClick={handleClose}
              />
              {/* invoice-reset <Link href={AppRoutes.profile.my_invoice} className="w-full">
                <Button
                  title="Go to invoice"
                  variant="outline"
                  outlineBG="light"
                  className="w-full text-sm md:text-base"
                />
              </Link> */}
            </div>
          </div>
        </div>
      </ModalContainer>
    );
  }

  if (failure) {
    return (
      <ModalContainer
        modalId="create-order-modal-failure"
        isOpen={open}
        onClose={handleClose}
        modalContentClassName="h-auto rounded-xl w-full md:max-w-max md:!px-20"
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
      >
        <div className="flex w-full flex-col">
          <div className="flex flex-col items-center gap-6 text-center">
            <GradientCancelIcon />
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-lg text-white md:text-xl">Payment failed</h3>
              <p className="max-w-[40ch] text-sm text-gray">
                Your payment could not be processed. Please provide an alternate payment method or
                contact your bank
              </p>
            </div>
            <div className="mt-4 flex w-full flex-col gap-2">
              <Button
                title="Try again"
                className="w-full text-sm md:text-base"
                onClick={tryAgain}
              />
              <Button
                title="Back to Home"
                variant="outline"
                outlineBG="light"
                className="w-full text-sm md:text-base"
                onClick={handleClose}
              />
            </div>
          </div>
        </div>
      </ModalContainer>
    );
  }

  return (
    <ModalContainer
      modalId="create-order-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto rounded-xl w-full md:max-w-[70%]"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-normal text-white md:text-xl">Review Sigillum and Pay</h3>
          </div>
          <span onClick={onClose}>
            <IoIosCloseCircleOutline className="size-6 h-6 w-6 shrink-0 cursor-pointer fill-white stroke-2" />
          </span>
        </div>
        <div className="custom-scrollbar h-[80vh] overflow-y-auto p-3 sm:h-auto">
          <div className="flex w-full flex-col gap-10 pt-10 lg:flex-row">
            <div className="flex flex-col justify-between gap-8 rounded-xl  text-white">
              {SigillumDetails && SigillumDetails.owned_offices > 0 && (
                <div className="flex items-center gap-2 rounded-2xl bg-light p-3">
                  <ExclaimationIcon className="size-8 shrink-0 cursor-pointer stroke-2" />
                  <h3 className="pt-1 font-kanit text-xs font-normal text-brand-gold md:text-sm">
                    You already have an opened position, these Sigillum will be added to the cycle
                    of your currently opened position.
                  </h3>
                </div>
              )}
              <div className="flex h-full flex-col justify-center">
                <div className="form flex flex-col gap-4">
                  {clientSecret && (
                    <CheckoutPage
                      onPaymentSuccess={handlePaymentSuccess}
                      clientSecret={clientSecret}
                    />
                  )}
                  {!clientSecret && (
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
                  )}
                </div>
              </div>
            </div>

            {/* right card */}
            <div className="flex min-w-[300px] flex-col justify-between rounded-xl bg-primary p-6 text-white">
              <div className="flex flex-col">
                <div className="flex w-full items-center justify-between">
                  <h3 className="text-base text-white md:text-xl">Summary</h3>
                  <h6 className="text-sm text-white opacity-60">USD</h6>
                </div>
                <div className="flex flex-col gap-2 pb-4 pt-8">
                  <div className="flex w-full items-center justify-between">
                    <h6 className="text-sm text-white">Your Pack</h6>
                    <h6 className="text-sm text-white">{numberOfUnits}</h6>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <h6 className="text-sm text-white">Single Pack Cost</h6>
                    <h6 className="text-sm text-white">{singleamount}</h6>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <h6 className="text-sm text-white">Start Date</h6>
                    <h6 className="text-sm text-white">{dayjs(StartDate).format('DD MMM YYYY')}</h6>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <h6 className="text-sm text-white">End Date</h6>
                    <h6 className="text-sm text-white">{finalExpiraryDate}</h6>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between border-t border-[#0E1F30] pt-4 font-nexablack font-black">
                  <h6 className="text-sm text-white">Total</h6>
                  <h6 className="text-sm text-white">{totalamount} USD</h6>
                </div>
              </div>
              <div className="flex flex-col gap-4 pt-10">
                <div className="flex items-center gap-2">
                  <LockIcon className="shrink-0" />
                  <p className="mt-1 text-xs text-[#CCCCCC]">
                    We use 3D Secure to protect your payment
                  </p>
                </div>
                <Image
                  src={'/images/security-card.png'}
                  alt="security card icon"
                  width={71}
                  height={21}
                  className="shrink-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};
