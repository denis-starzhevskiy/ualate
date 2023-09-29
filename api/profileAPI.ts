import axiosInstance from '@/api/axios/axiosInstance';
import { BookProps } from '@/components/elements/Book';

export type ProfileProps = {
  user?: string;
  photo?: string | null;
  balance?: string;
  register_date?: string;
  commission?: number;
  is_staff?: boolean;
  bought_books?: BookProps[];
};

export const getProfiles = async (): Promise<{
  count: number;
  next: string | null;
  prev: string | null;
  results: ProfileProps[];
}> => {
  const { data } = await axiosInstance.get('/profiles/');

  return data;
};

export const getUserProfile = async (
  userId: number | undefined,
  authToken?: string
): Promise<ProfileProps> => {
  const { data } = await axiosInstance.get(`/profiles/${userId}`);

  return data;
};

export type MessageUsersProps = {
  id: number;
  email: string;
};

export const getMessageUsers = async (): Promise<MessageUsersProps[]> => {
  const { data } = await axiosInstance.get(`/message-users`);

  return data;
};
