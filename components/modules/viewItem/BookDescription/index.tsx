import clsx from 'clsx';
import React from 'react';

import 'swiper/css';
import 'swiper/css/navigation';

import s from './BookDescription.module.scss';

const BoookDescription = ({ description }: { description: string }) => {
  return (
    <section className={clsx(s.section, 'section')}>
      <div className="container">
        <div className={s.wrapper}>
          <div className={s.text}>
            <h2 className={s.title}>Опис книги</h2>
            <p className={s.descriptionText}>{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoookDescription;
