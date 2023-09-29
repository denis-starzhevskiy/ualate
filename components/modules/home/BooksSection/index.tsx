import React from 'react';
import clsx from 'clsx';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, Autoplay } from 'swiper';

import Book, { BookProps } from '@/components/elements/Book';
import GlobalSvgSelector from '@/components/GlobalSvgSelector';

import 'swiper/css';
import 'swiper/css/navigation';

import s from './BooksSection.module.scss';

type Props = {
  items: BookProps[];
  title: string;
  light?: boolean;
  countDesktopSlider?: number;
};

const BooksSection = ({ items, title, light, countDesktopSlider }: Props) => {
  return (
    <section className={clsx(s.section, 'section', light && 'light')}>
      <div className="container">
        <div className={s.wrapper}>
          <h2 className={clsx(s.title, 'title-section')}>{title}</h2>
          <div className={clsx(s.content, light && s.light)}>
            <Swiper
              className={s.slider}
              spaceBetween={10}
              slidesPerView={1.5}
              speed={1000}
              style={{ padding: '30px 50px' }}
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
                992: {
                  slidesPerView: countDesktopSlider || 4,
                  spaceBetween: 30,
                },
              }}>
              {items &&
                items.map((item) => (
                  <SwiperSlide key={item.id}>
                    <Book {...item} />
                  </SwiperSlide>
                ))}

              <div className={s.slider__wrapper}>
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
  );
};

export default BooksSection;
