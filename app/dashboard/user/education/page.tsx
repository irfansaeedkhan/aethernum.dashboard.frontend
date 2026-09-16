'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/shared';

const Education = () => {
  return (
    <div className="z-10 flex w-full flex-col gap-4 rounded-xl bg-light p-6 text-white">
      <h2 className="text-base font-normal md:text-xl">Education</h2>
      <p className="text-sm text-white/70">
        Learning modules and guides will appear here. This demo page confirms navigation works.
      </p>
      <Button
        title="Open demo lesson"
        className="w-fit text-sm"
        onClick={() => toast.success('Education content is demo-only for now.')}
      />
    </div>
  );
};

export default Education;
