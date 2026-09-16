import cn from '@/utils/cn';
import React, { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi2';

type InfoIconWithTooltipProps = {
  text: string;
  color?: string;
};

const InfoIconWithTooltip: React.FC<InfoIconWithTooltipProps> = ({ text, color = '#00A3FF' }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div className="relative z-10 inline-block">
      {/* <FaInfoCircle
        className="size-4 cursor-pointer text-blue-500"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        onClick={() => setIsTooltipVisible(!isTooltipVisible)}
      /> */}
      <HiOutlineExclamationCircle
        className={cn(`size-5 h-5 w-5 shrink-0 cursor-pointer text-[${color}]`)}
        style={{ color }}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        onClick={() => setIsTooltipVisible(!isTooltipVisible)}
      />
      {isTooltipVisible && (
        <div className="absolute right-0 mt-2 min-w-[20ch] max-w-[37ch] rounded border border-[#FFAA21] bg-light px-3 py-2 text-xxs text-white shadow-lg">
          {text}
        </div>
      )}
    </div>
  );
};

export default InfoIconWithTooltip;
