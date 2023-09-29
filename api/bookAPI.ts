import axiosInstance from '@/api/axios/axiosInstance';
import { BookProps } from '@/components/elements/Book';
import queryString from "query-string";

export type BookApiProps = {
  count: number;
  next: string | null;
  prev: string | null;
  results: BookProps[];
};


export type bookQueryParams = {
  age_restrictions?: boolean,
  fund?: string,
  genres?: string[],
  ordering?: string,
  original_language?: "ua" | "en" | "fr",
  tags?: string[],
  type_book?: "translated" | "origin",
  page: number
}

export const getBooks = async (
  filteredQuery: bookQueryParams
): Promise<{ count: number; next: string | null; prev: string | null; results: BookProps[] }> => {
  const { data } = await axiosInstance.get(`/books?${queryString.stringify(filteredQuery, { arrayFormat: "comma" })}`);

  return data;

  // return {
  //   count: 3,
  //   next: null,
  //   prev: null,
  //   results: [
  //     {
  //       id: 1,
  //       is_approved: true,
  //       title: 'New Harry Potter',
  //       description: 'New Harry Potter Descr',
  //       original_language: 'en',
  //       type_book: 'origin',
  //       age_restrictions: false,
  //       is_ready: true,
  //       created: '2023-04-19',
  //       last_edit: '2023-04-19',
  //       main_photo: 'http://ualate.com/media/images/books/pepesword_JZHLyiu.jpg',
  //       can_buy_all_book: true,
  //       price: '100.00',
  //       price_chapter: '10.00',
  //       fund: 'Fantasy',
  //       tags: [],
  //       genres: [],
  //       views: 6,
  //       likes: 0,
  //       author: {
  //         id: 1,
  //         email: 'fiodorlukashov@gmail.com',
  //         first_name: 'Fiodor',
  //         last_name: 'Lukashov',
  //       },
  //     },
  //     {
  //       id: 2,
  //       is_approved: true,
  //       title: 'Test Book',
  //       description: 'Тестовий опис',
  //       original_language: 'en',
  //       type_book: 'translated',
  //       age_restrictions: false,
  //       is_ready: true,
  //       created: '2023-04-20',
  //       last_edit: '2023-04-20',
  //       main_photo: 'http://ualate.com/media/images/books/20030921.png',
  //       can_buy_all_book: true,
  //       price: '139.00',
  //       price_chapter: '12.00',
  //       fund: 'Fantasy',
  //       tags: ['test'],
  //       genres: ['test genre'],
  //       views: 0,
  //       likes: 0,
  //       author: {
  //         id: 5,
  //         email: 'hebedimblu@gmail.com',
  //         first_name: 'Test',
  //         last_name: 'User',
  //       },
  //     },
  //     {
  //       id: 3,
  //       is_approved: true,
  //       title: 'Test Book 2',
  //       description: 'Опис',
  //       original_language: 'fr',
  //       type_book: 'origin',
  //       age_restrictions: true,
  //       is_ready: true,
  //       created: '2023-04-24',
  //       last_edit: '2023-04-20',
  //       main_photo: 'http://ualate.com/media/images/books/catim.jpg',
  //       can_buy_all_book: true,
  //       price: '140.00',
  //       price_chapter: '25.00',
  //       fund: 'Fantasy',
  //       tags: ['test'],
  //       genres: ['test genre'],
  //       views: 0,
  //       likes: 0,
  //       author: {
  //         id: 1,
  //         email: 'fiodorlukashov@gmail.com',
  //         first_name: 'Fiodor',
  //         last_name: 'Lukashov',
  //       },
  //     },
  //   ],
  // };
};

export const getBookById = async (id: string) => {
  const { data } = await axiosInstance.get(`/books/${id}`);

  return data;

  // return {
  //   id: 1,
  //   is_approved: true,
  //   chapters: ['http://ualate.com/chapter/1/'],
  //   title: 'New Harry Potter',
  //   description: 'New Harry Potter Descr',
  //   original_language: 'en',
  //   type_book: 'origin',
  //   age_restrictions: false,
  //   is_ready: true,
  //   created: '2023-04-19',
  //   last_edit: '2023-04-19',
  //   main_photo: 'http://ualate.com/media/images/books/pepesword_JZHLyiu.jpg',
  //   can_buy_all_book: true,
  //   price: '100.00',
  //   price_chapter: '10.00',
  //   fund: 'Fantasy',
  //   tags: [],
  //   genres: [],
  //   comments: [],
  //   subs: [],
  //   views: 6,
  //   likes: 0,
  //   author: {
  //     id: 1,
  //     email: 'fiodorlukashov@gmail.com',
  //     first_name: 'Fiodor',
  //     last_name: 'Lukashov',
  //   },
  // };
};

export const getBooksByAuthor = async (id: string) => {
  const { data } = await axiosInstance.get(`/books/${id}/author`);

  return data;
};

export const getBookLikes = async (bookId: number) => {
  const { data } = await axiosInstance.get(`/book_likes/${bookId}`);

  return data;
};

export const editBookData = async (book: BookProps) => {
  const { data } = await axiosInstance.put(`/books/${book.id}`, book);

  return data;
};

export const deleteBookData = async (bookId: number) => {
  const { data } = await axiosInstance.delete(`/books/${bookId}`);

  return data;
};

export const buyBook = async (bookId: number) => {
  const { data } = await axiosInstance.get(`/books/${bookId}/buy_book/`);

  return data;
};

export const searchBooks = async (
  searchQuery: string | null
): Promise<{ count: number; next: string | null; prev: string | null; results: BookProps[] }> => {
    const { data } = await axiosInstance.get(`/search?search=${searchQuery || ""}`);
    return data;
};
