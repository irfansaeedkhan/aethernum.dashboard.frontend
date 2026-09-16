'use client';

import React from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/shared';

const ChatBot = () => {
  return (
    <div className="z-10 flex w-full flex-col gap-4 rounded-xl bg-light p-6 text-white">
      <h2 className="text-base font-normal md:text-xl">Chat bot</h2>
      <p className="text-sm text-white/70">
        Ask product questions in this demo workspace. Responses are simulated locally.
      </p>
      <Button
        title="Start demo chat"
        className="w-fit text-sm"
        onClick={() => toast.success('Chat bot is ready in demo mode.')}
      />
    </div>
  );
};

export default ChatBot;
