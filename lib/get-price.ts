import { AppError } from '@/utils/app-error';
import { axiosAPI } from '@/utils/axios';

export const getPrice = async ({
  base,
  quote,
}: {
  base: string;
  quote: string;
}): Promise<number> => {
  try {
    const { data } = await axiosAPI.get(`v1/pricing/${base}/${quote}`);

    return data;
  } catch (error: unknown) {
    throw new AppError(error instanceof Error ? error : new Error('Unknown error'), 'Failed to validate token', 'getPrice');
  }
};
