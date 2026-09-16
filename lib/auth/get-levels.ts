import { AppError } from '@/utils/app-error';
import { axiosAPIBlockchain } from '@/utils/axios/axios-api';

export const getLevels = async (): Promise<LevelsResponse | null> => {
  try {
    const res = await axiosAPIBlockchain.get('/users/levels');
    return res.data;
  } catch (error: any) {
    const errorMessage = 'Failed to get levels details';
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, 'getLevels');
    } else {
      throw new AppError(error, error.response?.data?.error ?? errorMessage, 'getLevels');
    }
  }
};

export type Level = {
  level: number;
  bonus_percentage: number;
  is_unlocked: boolean;
  investment_required: number;
  current_investment?: number;
  description: string;
  unlock_message?: string;
};

export type LevelsResponse = {
  total_weekly_return: number;
  base_weekly_return: number;
  levels: Level[];
};

