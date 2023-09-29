import axiosInstance from '@/api/axios/axiosInstance';

export const getComments = async (id: string) => {
  const { data } = await axiosInstance.get(`/comments?id=${id}&&type=book`);

  return data;
};

export const createComment = async (bookId: number, request: object) => {
  const { data } = await axiosInstance.post(`/comments?id=${bookId}&&type=book`, request);

  return data;
};
