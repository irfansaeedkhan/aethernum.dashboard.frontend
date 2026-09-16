'use client';
import { TransactionTable } from '@/components/dashboard';
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { CgSpinner } from 'react-icons/cg';

import { TransactionTableMobile } from '@/components/dashboard/transaction-table-mobile';

import { getAvailableBalance, GetAvailableBalanceResponse } from '@/lib/auth/get-available-balance';
import {
  BuySigillumDetailResponse,
  getBuySigillumDetail,
} from '@/lib/auth/get-buy-meta-asset-detail';
import { getSigillumDetails, SigillumDetailsResponse } from '@/lib/auth/get-meta-asset-details';
import {
  getTransactionDetail,
  GetTransactionDetailResponse,
} from '@/lib/auth/get-transaction-details';

import { getProfileDataApiResponseType } from '@/components/profile/profile-card-data';
import { useTutorial } from '@/hooks/use-tutorial';
import {
  getCardTransactionDetail,
  GetCardTransactionDetailResponse,
} from '@/lib/auth/get-card-transaction-details';
import { getProfile } from '@/lib/auth/get-profile';
import { GetRewardListItemResponse, getShowRewardListDetails } from '@/lib/auth/get-rewards-list';

const UserDashboard = () => {
  // const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [rewardListpage, setRewardListPage] = useState(1);
  const [rewardListTotalPages, setRewardListTotalPages] = useState(0);
  const [profileData, setProfileData] = useState<getProfileDataApiResponseType | null>(null);

  // Tutorial state
  const { initializeTutorial } = useTutorial();

  const DashboardLazyCards = lazy(() => import('../../../components/dashboard/dashboard-cards'));
  const RevenueGraphLazy = lazy(() => import('@/components/dashboard/graph'));

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  const handleRewardLlistNextPage = () => {
    if (rewardListpage < rewardListTotalPages) {
      setRewardListPage(prevPage => prevPage + 1);
    }
  };

  const handleRewardlistPrevPage = () => {
    if (rewardListpage > 1) {
      setRewardListPage(prevPage => prevPage - 1);
    }
  };

  // States
  const [successPurchase, setSuccessPurchase] = useState<boolean>(false);
  const [SigillumDetails, setSigillumDetails] = useState<SigillumDetailsResponse>();
  const [buySigillumDetail, setBuySigillumDetail] = useState<BuySigillumDetailResponse>();
  const [transactionDetailList, setTransactionDetailList] =
    useState<GetTransactionDetailResponse>();
  const [cardTransactionDetailList, setCardTransactionDetailList] =
    useState<GetCardTransactionDetailResponse>();
  const [availableBalance, setAvailableBalance] = useState<GetAvailableBalanceResponse>();
  const [rewardList, setRewardList] = useState<GetRewardListItemResponse>();
  const [selectedTransactionTab, setSelectedTransactionTab] = useState<string>('balance');

  // API CALLS
  const GetSigillumDetails = useCallback(async () => {
    try {
      const res = await getSigillumDetails();
      setSigillumDetails(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const GetBuySigillumDetail = useCallback(async () => {
    try {
      const res = await getBuySigillumDetail();
      setBuySigillumDetail(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const GetTransactionDetail = useCallback(async () => {
    try {
      const res = await getTransactionDetail();
      setTransactionDetailList(res);
      setTotalPages(Math.max(1, Math.ceil((res?.length || 0) / 5)));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const GetCardTransactionDetail = useCallback(async () => {
    try {
      const res = await getCardTransactionDetail();
      setCardTransactionDetailList(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const GetBalanceData = useCallback(async () => {
    try {
      const res = await getAvailableBalance();
      setAvailableBalance(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const GetRewardsListDetails = useCallback(async () => {
    try {
      const res = await getShowRewardListDetails();
      setRewardList(res);
      setRewardListTotalPages(Math.max(1, Math.ceil((res?.length || 0) / 5)));
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Load all data on mount
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const results = await Promise.allSettled([
          getProfile().then(res => setProfileData(res)),
          getAvailableBalance().then(res => setAvailableBalance(res)),
          getSigillumDetails().then(res => setSigillumDetails(res)),
          getBuySigillumDetail().then(res => setBuySigillumDetail(res)),
          getTransactionDetail().then(res => {
            setTransactionDetailList(res);
            setTotalPages(Math.max(1, Math.ceil((res?.length || 0) / 5)));
          }),
          getCardTransactionDetail().then(res => setCardTransactionDetailList(res)),
          getShowRewardListDetails().then(res => {
            setRewardList(res);
            setRewardListTotalPages(Math.max(1, Math.ceil((res?.length || 0) / 5)));
          }),
        ]);

        results.forEach((result, index) => {
          if (result.status === 'rejected') {
            console.error(`Call ${index + 1} failed:`, result.reason);
          }
        });
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Function to refresh data after successful purchase
  const refreshDataAfterPurchase = useCallback(async () => {
    try {
      await Promise.allSettled([
        GetBalanceData(),
        GetSigillumDetails(),
        GetTransactionDetail(),
        GetCardTransactionDetail(),
      ]);
    } catch (error) {
      console.error('Error refreshing data after purchase:', error);
    }
  }, [GetBalanceData, GetSigillumDetails, GetTransactionDetail, GetCardTransactionDetail]);

  // Handle successful purchase
  useEffect(() => {
    if (successPurchase) {
      refreshDataAfterPurchase();
      setSuccessPurchase(false);
    }
  }, [successPurchase, refreshDataAfterPurchase]);

  useEffect(() => {
    if (profileData?.IsFirstLogin === undefined) return;
    initializeTutorial({ isFirstLogin: profileData.IsFirstLogin });
  }, [profileData?.IsFirstLogin, initializeTutorial]);

  return (
    <div className="z-10 flex flex-col gap-5">
      <Suspense
        fallback={
          <div className="fixed inset-0 z-[3000] flex h-full w-full items-center justify-center bg-primary/50">
            <CgSpinner className="size-14 mx-auto mt-20 h-14 w-14 shrink-0 animate-spin text-white" />
          </div>
        }
      >
        <DashboardLazyCards
          availableBalance={availableBalance}
          SigillumDetails={SigillumDetails}
          buySigillumDetail={buySigillumDetail}
          rewardListData={rewardList}
          handleRewardLlistNextPage={handleRewardLlistNextPage}
          handleRewardlistPrevPage={handleRewardlistPrevPage}
          rewardListpage={rewardListpage}
          setRewardListPage={setRewardListPage}
          rewardListTotalPages={rewardListTotalPages}
          setSuccessPurchase={setSuccessPurchase}
          isDemo={profileData?.IsDemo ?? false}
        />
      </Suspense>

      <Suspense
        fallback={
          <div className="h-64 w-full animate-pulse rounded-xl bg-light" />
        }
      >
        <RevenueGraphLazy />
      </Suspense>

      {/* transaction history */}
      <div className="z-10 flex w-full flex-col rounded-xl bg-light">
        <div className="flex flex-col items-start gap-4 px-6 py-5">
          <span className="text-base font-normal leading-7 text-white md:text-xl">
            Transaction History
          </span>
          {/* tabs */}
          <div className="flex items-center gap-4">
            <button
              className={`${
                selectedTransactionTab === 'balance' ? 'text-brand-mint' : 'text-white/50'
              } flex items-center gap-2`}
              onClick={() => setSelectedTransactionTab('balance')}
            >
              <span className="text-sm font-medium leading-7">Balance</span>
            </button>
            {/* invoice-reset <button
              className={`${
                selectedTransactionTab === "card"
                  ? "text-brand-mint"
                  : "text-white/50"
              } flex items-center gap-2`}
              onClick={() => setSelectedTransactionTab("card")}
            >
              <span className="text-sm font-medium leading-7">Card</span>
            </button> */}
          </div>
        </div>

        <div className="max-w-full overflow-x-auto">
          {/* balance transaction */}
          {selectedTransactionTab === 'balance' && (
            <div className="w-full">
              <div className="hidden lg:block">
                <TransactionTable
                  transactionDetailList={transactionDetailList}
                  page={page}
                  setPage={setPage}
                />
              </div>
              <div className="block lg:hidden">
                <TransactionTableMobile
                  transactionDetailList={transactionDetailList}
                  handlePrevPage={handlePrevPage}
                  handleNextPage={handleNextPage}
                  page={page}
                  totalPages={totalPages}
                />
              </div>
            </div>
          )}
          {/* card transaction */}

          {/* {selectedTransactionTab === "card" && (
            <div className="w-full">
              <div className="hidden lg:block">
                <CardTransactionTable
                  cardTransactionDetailList={cardTransactionDetailList}
                  page={page}
                  setPage={setPage}
                />
              </div>
              <div className="block lg:hidden">
                <CardTransactionTableMobile
                  cardTransactionDetailList={cardTransactionDetailList}
                  handlePrevPage={handlePrevPage}
                  handleNextPage={handleNextPage}
                  page={page}
                />
              </div>
            </div>
          )} */}
        </div>
      </div>

      <div>
        {loading && (
          <div className="fixed inset-0 z-[3000] flex h-full w-full items-center justify-center bg-primary/50">
            <CgSpinner className="size-14 mx-auto mt-20 animate-spin text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
