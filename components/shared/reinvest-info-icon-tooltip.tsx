import cn from '@/utils/cn';
import React, { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi2';

interface Props {
  text: string;
  color?: string;
}

const ReinvestInfoIconWithTooltip: React.FC<Props> = ({ text, color = '#00A3FF' }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div className="relative z-10 inline-block">
      <HiOutlineExclamationCircle
        className={cn(`size-5 h-5 w-5 shrink-0 cursor-pointer text-[${color}]`)}
        style={{ color }}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        onClick={() => setIsTooltipVisible(!isTooltipVisible)}
      />

      {isTooltipVisible && (
        <div className="absolute left-[-170px] top-[26px] mt-2 w-full min-w-[25ch] max-w-[190px] rounded-lg bg-white px-3 py-2 text-xs text-light shadow-lg md:left-[26px] md:top-[-44px] md:max-w-[220px]">
          {text}
        </div>
      )}
    </div>
  );
};

export default ReinvestInfoIconWithTooltip;
