import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import 'swiper/css';
import 'swiper/css/navigation';
import s from './BooksSection.module.scss';
import Image from 'next/image';
import { bookIcon, bookMarkIcon } from '@/components/modules/icons';
import { BreadCrumbs } from '@/components/elements/BreadCrumbs/BreadCrumbs';
import { StarRating } from '@/components/elements/Rating/Rating';
import CoinsLabel from '@/components/elements/CoinsLabel/CoinsLabel';
import BookInformationTable from '@/components/elements/BookInformationTable/BookInformationTable';
import { BookProps } from '@/components/elements/Book';
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getLikedBooks, getMarkById, likeBook } from '@/api/bookmarkAPI';
import { buyBook } from '@/api/bookAPI';
import Loader from '@/components/elements/Loader/Loader';

// export type BookProps = {
//   id: number;
//   image: any;
//   link: string;
//   title: string;
//   description?: string;
//   author: string;
//   translator?: string;
//   sectionsNumber?: number;
//   genre?: string;
//   status: string;
//   fendom?: string;
//   tags?: {
//     link: string;
//     label: string;
//   }[];
//   rating?: number;
//   quality?: number;
// };

export const getServerSideProps = async (ctx: { params: { id: number } }) => {
  const { id } = ctx.params;

  const queryClient = new QueryClient();

  let isError = false;

  try {
    await queryClient.fetchQuery(['bookmark', id], () => getMarkById(id));
  } catch (error) {
    isError = true;
    // ctx.res.statusCode = error.response.status;
  }

  return {
    props: {
      //also passing down isError state to show a custom error component.
      isError,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const BooksSection = ({ book }: { book: BookProps }) => {
  const queryClient = useQueryClient();
  const { data: bookMark } = useQuery(['bookmark', book?.id], () => getMarkById(book.id));
  const { data: likes } = useQuery(['likes', book?.id], () => getLikedBooks());
  const mutation = useMutation({
    mutationFn: (request: { bookId: number }) => likeBook(request.bookId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['likes', book?.id]);
    },
  });
  const buyMutation = useMutation({
    mutationFn: (request: { bookId: number }) => buyBook(request.bookId),
  });
  const [isBookMark, setIsBookMark] = useState(false);

  useEffect(() => {
    if (likes && likes.results) {
      likes.results.map((item: { user: string; book: string }) => {
        if (item.book == book.id) {
          setIsBookMark(true);
        }
      });
    }
  }, [likes]);

  return (
    <section className={clsx(s.section, 'section')}>
      <div className="container">
        <BreadCrumbs
          path={[
            { title: 'Головна', link: '/' },
            { title: 'Перегляд книги', link: `/books/${book.id}` },
          ]}
        />
        <h2 className={s.title}>{book.title}</h2>
        <div className={s.container}>
          <Image
            src={book.main_photo.slice(0, 17) + '/api' + book.main_photo.slice(17)}
            alt={'title'}
            width={250}
            height={250}
          />
          <div className={s.tableContainer}>
            <BookInformationTable book={book} author={book?.author?.email} />
            <div className={s.actions}>
              <button className={'button'} onClick={() => buyMutation.mutate({ bookId: book.id })}>
                {buyMutation.isLoading ? <Loader size={25} /> : bookIcon()}Читати
              </button>
              {bookMark || isBookMark ? (
                <button className={'button'} disabled={true}>
                  {bookMark?.book_status || 'Додана до закладок'}
                </button>
              ) : (
                <button
                  className={'button'}
                  onClick={() => {
                    if (window) {
                      mutation.mutate({ bookId: book.id });
                    }
                  }}>
                  {bookMarkIcon()}До закладок
                </button>
              )}
            </div>
          </div>
          <div className={s.ratingInfoBlock}>
            <CoinsLabel coins={10} />
            <div className={s.ratingStarsContainer}>
              <div className={s.marginBottom45}>
                <h4 className={s.subTitle}>Рейтинг твору</h4>
                <StarRating rating={4} />
              </div>
              <div>
                <h4 className={s.subTitle}>Якість перекладу</h4>
                <StarRating rating={4} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BooksSection;
