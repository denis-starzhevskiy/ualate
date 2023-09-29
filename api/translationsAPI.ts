import axiosInstance from '@/api/axios/axiosInstance';

export const createTranslations = async (request: object) => {
  const headers = {
    'Content-Type': 'text/plain',
  };
  const { data } = await axiosInstance.post(`/books`, request, { headers });

  return data;
};
