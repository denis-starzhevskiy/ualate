import { useQuery } from '@tanstack/react-query';
import { getBookById, getBooks, searchBooks } from '@/api/bookAPI';

export const useBooks = (page?: number) => {
  return useQuery(['books', page], () => getBooks({ page: page || 1 }), {
    keepPreviousData: true,
  });
};

export const useSearch = (searchQuery: string | null) => {
  return useQuery(['books', searchQuery], () => searchBooks(searchQuery), {
    keepPreviousData: true,
  });
};

export const useBook = (id: string) => {
  return useQuery(['book', id], () => getBookById(id));
};

export const useTranslators = () => {
  return useQuery([]);
};
