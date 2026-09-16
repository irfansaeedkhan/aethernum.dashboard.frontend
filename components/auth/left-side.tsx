'use client';
import React from 'react';
import Image from 'next/image';

interface Props {
  page_name: 'login' | 'register';
}

const LeftSide: React.FC<Props> = ({ page_name }) => {
  const imageSource = page_name === 'login' ? '/images/login.png' : '/images/register.png';
  return (
    <Image
      src={imageSource}
      alt="left side image"
      width={555}
      height={491}
      className="flex-shrink-0"
      unoptimized
    />
  );
};

export default LeftSide;
