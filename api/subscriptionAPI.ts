import axiosInstance from '@/api/axios/axiosInstance';

export type SubscriptionData = {
  name: string;
  price: string;
  quantity: number;
};

export const getSubscriptions = async (): Promise<{
  count: number;
  next: string | null;
  prev: string | null;
  results: SubscriptionData[];
}> => {
  const { data } = await axiosInstance.get('/subscriptions/');

  return data;
};

export const getSubscriptionById = async (subscriptionId: number) => {
  const { data } = await axiosInstance.get(`/subscriptions/${subscriptionId}`);

  return data;
};

export const createSubscription = async (subscriptionData: SubscriptionData) => {
  const { data } = await axiosInstance.post(`/subscriptions/`, subscriptionData);

  return data;
};

export const changeSubscription = async (subscriptionData: SubscriptionData) => {
  const { data } = await axiosInstance.put(`/subscriptions/`, subscriptionData);

  return data;
};

export const deleteSubscription = async (subscriptionId: number) => {
  const { data } = await axiosInstance.delete(`/subscriptions/${subscriptionId}`);

  return data;
};
