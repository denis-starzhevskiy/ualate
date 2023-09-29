import { BookProps } from '@/components/elements/Book';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import s from './LatestUpdates.module.scss';

type LatestProps = {
  items: BookProps[];
};

const LatestUpdates = ({ items }: LatestProps) => {
  return (
    <section className={clsx(s.section, 'section')}>
      <div className="container">
        <div className={s.wrapper}>
          <h2 className={clsx(s.title, 'title-section')}>Останні оновлення</h2>
          <div className={s.content}>
            <div className={s.items}>
              {items && items.map((item) => <LatestUpdatesBook key={item.id} {...item} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestUpdates;

const LatestUpdatesBook = ({ main_photo, id, title, tags }: BookProps) => {
  return (
    <div className={s.book}>
      <Link href={`books/${id}`}>
        <Image
          className={s.image}
          src={main_photo.slice(0, 17) + '/api' + main_photo.slice(17)}
          width={119}
          height={172}
          alt={title}
        />
      </Link>
      <div className={s.body}>
        <Link href={`books/${id}`} className={s.label}>
          {title}
        </Link>
        {tags && (
          <div className={s.tags}>
            <ul>
              {tags.map((tag, index) => (
                <li key={index}>
                  <Link href={`tags/${tag}`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
