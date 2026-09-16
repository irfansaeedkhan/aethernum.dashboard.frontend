'use client';
import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { Percentage } from '@/lib/auth/get-graph-details';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

interface Props {
  graphData: Percentage[];
}

type Series = {
  name: string;
  data: number[];
};

export const TransactionChart: React.FC<Props> = ({ graphData }) => {
  const [optionsData, setOptionsData] = useState<ApexOptions>({});
  const [series, setSeries] = useState<Series[]>([]);

  const updateChartData = useCallback(() => {
    // Round data values to integers
    const dataPoints = graphData.map(data => Math.floor(Object.values(data)[0]));

    const maxValue = Math.max(...dataPoints, 0);
    // Round down to nearest integer
    const roundedMax =
      maxValue <= Math.floor(maxValue) + 0.5 ? Math.floor(maxValue) : Math.floor(maxValue) + 1;

    setSeries([
      {
        name: 'Revenue',
        data: dataPoints,
      },
    ]);

    setOptionsData({
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false,
        },
      },

      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '8px',
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        labels: {
          style: {
            colors: '#ffffff',
            fontSize: '0.8rem',
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },

      yaxis: {
        min: 0,
        max: roundedMax,
        // tickAmount: roundedMax,
        labels: {
          formatter: val => `${Math.round(val)}%`,
          style: {
            colors: ['#ffffff'],
            fontSize: '0.7rem',
          },
        },
      },
      colors: ['#933C1F'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'vertical',
          gradientToColors: ['#FFAA21'],
          stops: [0, 100],
        },
      },
      grid: {
        show: true,
        borderColor: '#0B1314',
        yaxis: {
          lines: {
            show: true,
          },
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      tooltip: {
        theme: 'dark',
        style: {
          fontSize: '12px',
          fontFamily: undefined,
        },
        x: {
          show: true,
          format: 'MM',
        },
        y: {
          formatter: val => `${val}%`,
        },
        marker: {
          show: false,
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const month = w.globals.labels[dataPointIndex];
          const value = series[seriesIndex][dataPointIndex];

          return `
            <div style="background-color: #0B1314; border: 1px solid #FFAA21; padding: 8px; border-radius: 8px; min-width: 100px;">
              <p style="color: white; font-weight: bold; margin: 0;">Revenue</p>
              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px;">
              <p style="color: #FFAA21; margin: 0; padding-right: 8px;">${month}</p>
              <p style="color: #FFAA21; margin: 0; padding-left: 8px;">${value}%</p>
              </div>
            </div>
          `;
        },
      },
    });
  }, [graphData]);

  useEffect(() => {
    updateChartData();
  }, [updateChartData]);

  return (
    <div className="text-white">
      <ReactApexChart options={optionsData} series={series} type="bar" width="100%" height={350} />
    </div>
  );
};
