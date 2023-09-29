import axiosInstance from '@/api/axios/axiosInstance';

export const getPurchase = async () => {
  const { data } = await axiosInstance.get('/purchased/');

  return data;
};

export const getPurchaseById = async (purchaseId: number) => {
  const { data } = await axiosInstance.get(`/purchased/${purchaseId}`);

  return data;
};
