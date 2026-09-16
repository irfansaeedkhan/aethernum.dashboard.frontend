'use client';

import MinerChartBox from '@/components/rental-miners/miner-chart-box';

const RentalMinersPage = () => {
  return (
    <section className="relative flex w-full flex-col gap-4 overflow-hidden pb-10">
      <div className="miner-box relative z-0 mx-auto min-h-dvh w-full">
        <MinerChartBox bucketId="Miner_153F407D" minerName="153F407D" officeSize="Large Sigillum" />
      </div>
    </section>
  );
};

export default RentalMinersPage;
