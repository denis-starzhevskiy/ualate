import axiosInstance from '@/api/axios/axiosInstance';

export type StatisticProps = {
  looked: number;
  income: string;
  sold: number;
  like: number;
  in_marks: number;
  all_characters: number;
  all_comments: number;
  all_books: number;
  balance: number;
};

export const getStatistic = async (): Promise<StatisticProps> => {
  const { data } = await axiosInstance.get('/statistic/');

  return data;

  // return {
  //   looked: 0,
  //   income: '0.00',
  //   sold: 0,
  //   like: 0,
  //   in_marks: 0,
  //   all_characters: 0,
  //   all_comments: 0,
  //   all_books: 0,
  //   balance: 0.0,
  // };
};
