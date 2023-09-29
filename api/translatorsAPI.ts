import axiosInstance from '@/api/axios/axiosInstance';

export const getTranslators = async (sortFilter?: {}) => {
  if (sortFilter) {
    const { data } = await axiosInstance.get(`/translators?ordering=${sortFilter}`);

    return data;
  }

  const { data } = await axiosInstance.get(`/translators`);

  return data;
  // return [
  //   {
  //     first_name: 'Fiodor',
  //     last_name: 'Lukashov',
  //     book_count: 4,
  //     comment_count: 1,
  //   },
  //   {
  //     first_name: 'Test',
  //     last_name: 'User',
  //     book_count: 1,
  //     comment_count: 5,
  //   },
  // ];
};
