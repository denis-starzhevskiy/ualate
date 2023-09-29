import axiosInstance from '@/api/axios/axiosInstance';

export const getAdvAdd = async () => {
  const { data } = await axiosInstance.get(`/adv-add/`);

  return data;
};

export const addAdv = async (request: {
  date_start: string;
  date_finish: string;
  book: number;
}) => {
  const { data } = await axiosInstance.post(`/adv-add/`);

  return data;
};

export const getAddBooks = async () => {
  const { data } = await axiosInstance.get(`/adv-books/`);

  return data;
};
