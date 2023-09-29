import React from 'react';
import clsx from 'clsx';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Navigation, Pagination } from 'swiper';

import { BookProps } from '@/components/elements/Book';
import GlobalSvgSelector from '@/components/GlobalSvgSelector';

import 'swiper/css';
import 'swiper/css/navigation';

import s from './BooksSection.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { withCSR } from '@/utils/with-CSR';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { getBooksByAuthor } from '@/api/bookAPI';
import moment from 'moment';

type Props = {
  title: string;
  light?: boolean;
  countDesktopSlider?: number;
  bookId: string;
};

const BooksSection = ({ bookId, title, light }: Props) => {
  const { isLoading, data: items } = useQuery(['authors', bookId], () => getBooksByAuthor(bookId));

  console.log(items && items.length > 5);

  return (
    <>
      {items && items.length !== 0 && (
        <section className={clsx(s.section, 'section', light && 'light')}>
          <div className="container">
            <div className={s.wrapper}>
              <h2 className={clsx(s.title, 'title-section')}>{title}</h2>
              <div className={clsx(s.content, light && s.light)}>
                <Swiper
                  className={s.slider}
                  spaceBetween={10}
                  slidesPerView={1}
                  speed={1000}
                  watchOverflow={true}
                  navigation={{
                    nextEl: '.arrow-next-books',
                    prevEl: '.arrow-prev-books',
                  }}
                  pagination={{
                    el: '.slider-pagination-books',
                    clickable: true,
                  }}
                  keyboard={true}
                  modules={[Navigation, Pagination, Keyboard, Autoplay]}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    600: {
                      slidesPerView: 2,
                      spaceBetween: 30,
                    },
                    800: {
                      slidesPerView: 4,
                      spaceBetween: 30,
                    },
                    1024: {
                      slidesPerView: 6,
                      spaceBetween: 30,
                    },
                  }}>
                  {items &&
                    items.map((item: BookProps) => {
                      return (
                        <SwiperSlide key={item.id}>
                          <div className={'book'}>
                            <div className={'head'}>
                              <Link href={`/books/${item.id}`} className={'iresponsive'}>
                                <Image
                                  className={'image'}
                                  src={
                                    item.main_photo.slice(0, 17) +
                                    '/api' +
                                    item.main_photo.slice(17)
                                  }
                                  width={300}
                                  height={300}
                                  alt={item.title}
                                />
                              </Link>
                            </div>
                            <div className={'body'}>
                              <Link href={`/books/${item.id}`} className={s.bookTitle}>
                                {item.title}
                              </Link>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}

                  <div
                    className={
                      items && items.length > 5 ? s.slider__wrapper : s.sliderWithoutSwipe__wrapper
                    }>
                    <div className={clsx(s.arrow, 'arrow', 'arrow-prev-books')}>
                      <div className="arrow__icon icon">
                        <GlobalSvgSelector id="chevron_prev" />
                      </div>
                    </div>
                    <div
                      className={clsx(
                        s.pagination,
                        'slider-pagination',
                        'slider-pagination-books'
                      )}></div>
                    <div className={clsx(s.arrow, 'arrow', 'arrow-next-books')}>
                      <div className="arrow__icon icon">
                        <GlobalSvgSelector id="chevron_next" />
                      </div>
                    </div>
                  </div>
                </Swiper>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export const getServerSideProps = withCSR(async (ctx: { params: { bookId: string } }) => {
  const { bookId } = ctx.params;

  const queryClient = new QueryClient();

  let isError = false;

  try {
    await queryClient.fetchQuery(['authors', bookId], () => getBooksByAuthor(bookId));
  } catch (error) {
    isError = true;
  }

  return {
    props: {
      isError,
      dehydratedState: dehydrate(queryClient),
    },
  };
});

export default BooksSection;
