import Link from 'next/link';
import React from 'react';

import s from './Book.module.scss';
import moment from 'moment';
import Image from 'next/image';

export type BookProps = {
  id: number;
  is_approved: boolean;
  title: string;
  author: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
  description: string;
  original_language: string;
  type_book: 'translated' | 'origin';
  age_restrictions: boolean;
  is_ready: boolean;
  created: string;
  last_edit: string;
  likes?: number;
  views?: number;
  main_photo: string;
  can_buy_all_book: boolean;
  price: string;
  price_chapter: string;
  fund: string;
  tags: string[];
  genres?: string[];
  comments?: {
    id: number;
    fund_name: string;
  }[];
  chapters?: string[];
  subs?: {
    id: number;
    fund_name: string;
  }[];
};

export type ChapterProps = {
  book: number;
  chapter_name: string;
  content: string;
  is_free: boolean;
};

export type DiscountProps = {
  active: boolean;
  price: string;
  date_start: string;
  date_finish: string;
  book: number;
};

export type BookPreviewProps = {
  id: number;
  title: string;
  created: string;
  main_photo: string;
  price: string | undefined;
};

const checkNewDate = (createDate: string) => {
  return moment(createDate).isAfter(moment().subtract(1, 'week'));
};

const Book = ({ id, main_photo, title, created }: BookPreviewProps) => {
  const status = checkNewDate(created);

  console.log(main_photo.slice(0, 17) + '/api' + main_photo.slice(17));

  return (
    <div className={s.book}>
      <div className={s.head}>
        {status && <div className={s.status}>{'new'}</div>}

        <Link href={`/books/${id}`} className={s.iresponsive}>
          <Image
            src={main_photo.slice(0, 17) + '/api' + main_photo.slice(17)}
            alt={''}
            className={s.image}
            width={250}
            height={250}
          />
        </Link>
      </div>
      <div className={s.body}>
        <Link href={`/books/${id}`} className={s.title}>
          {title}
        </Link>
      </div>
    </div>
  );
};

export default Book;
