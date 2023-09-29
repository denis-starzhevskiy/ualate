import axiosInstance from '@/api/axios/axiosInstance';
import queryString from 'query-string';

export type NotificationProps = {
  id: number;
  unread: boolean;
  level: string;
  verb: string;
  timestamp: string;
};

export const getNotifications = async (filters: {}): Promise<{
  count: number;
  next: string | null;
  prev: string | null;
  results: NotificationProps[];
}> => {
  const { data } = await axiosInstance.get(
    `/notifications/?${queryString.stringify(filters, { arrayFormat: 'comma' })}`
  );

  return data;
};
