import axiosInstance from '@/api/axios/axiosInstance';
import { ChapterProps } from '@/components/elements/Book';

export const getChapterById = async (chapterId: string) => {
  const { data } = await axiosInstance.get(`/chapter/${chapterId}`);

  return data;
};

export const changeChapter = async (chapterId: number, chapterData: ChapterProps) => {
  const { data } = await axiosInstance.put(`/chapter/${chapterId}`, chapterData);

  return data;
};

export const deleteChapter = async (chapterId: number) => {
  const { data } = await axiosInstance.delete(`/chapter/${chapterId}`);

  return data;
};

export const createChapter = async (chapterData: ChapterProps) => {
  const { data } = await axiosInstance.post(`/chapter/add`, chapterData);

  return data;
};

export const buyChapter = async (chapterIds: number[]) => {
  const { data } = await axiosInstance.post(`/chapter/add`, chapterIds);

  return data;
};
