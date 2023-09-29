import axiosInstance from '@/api/axios/axiosInstance';
import { DiscountProps } from '@/components/elements/Book';

export const getDiscounts = async (page: number) => {
  const { data } = await axiosInstance.get(`/discount/`);

  return data;
};

export const getDiscountById = async (id: number) => {
  const { data } = await axiosInstance.get(`/discount/${id}`);

  return data;
};

export const createDiscount = async (discount: DiscountProps) => {
  const { data } = await axiosInstance.post(`/discount/`, discount);

  return data;
};

export const changeDiscount = async (id: number, discount: DiscountProps) => {
  const { data } = await axiosInstance.put(`/discount/${id}`, discount);

  return data;
};

export const deleteDiscount = async (id: number) => {
  const { data } = await axiosInstance.delete(`/discount/${id}`);

  return data;
};
