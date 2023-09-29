import axiosInstance from '@/api/axios/axiosInstance';

export const getTags = async () => {
  const { data } = await axiosInstance.get('/tags/');

  return data;
};
