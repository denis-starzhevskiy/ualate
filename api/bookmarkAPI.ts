import axiosInstance from '@/api/axios/axiosInstance';
import { BookProps } from '@/components/elements/Book';

export const getLikedBooks = async () => {
  const { data } = await axiosInstance.get(`/like`);

  return data;
};

export const likeBook = async (bookId: number) => {
  const { data } = await axiosInstance.post(`/like/`, {
    book: bookId,
  });

  return data;
};

export const getMarks = async (
  id: number
): Promise<{
  count: number;
  next: string | null;
  prev: string | null;
  results: BookProps[];
}> => {
  const { data } = await axiosInstance.get(`/marks?id=${id}`);

  return data;
};

export const getMarkById = async (markId: number) => {
  const { data } = await axiosInstance.get(`/marks/${markId}`);

  return data;
};

export const createMark = async (markId: number, markStatus: string) => {
  const { data } = await axiosInstance.post(`/marks`, {
    book_status: markStatus,
  });

  return data;
};

export const changeMark = async (markId: number, markStatus: string) => {
  const { data } = await axiosInstance.put(`/marks/${markId}`, {
    book_status: markStatus,
  });

  return data;
};

export const deleteMark = async (markId: number) => {
  const { data } = await axiosInstance.delete(`/marks/${markId}`);

  return data;
};
