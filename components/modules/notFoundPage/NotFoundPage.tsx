import React from 'react';
import clsx from 'clsx';
import s from './NotFoundPage.module.scss';
import { BreadCrumbs } from '@/components/elements/BreadCrumbs/BreadCrumbs';
import { homeIcon } from '@/components/modules/icons';

const NotFoundPage = () => {
  return (
    <section className={clsx(s.section)}>
      <div className={clsx('container', s.container)}>
        {/*<BreadCrumbs*/}
        {/*  path={[*/}
        {/*    { title: 'Головна', link: '/' },*/}
        {/*    { title: 'Головна', link: '/books/543543' },*/}
        {/*  ]}*/}
        {/*/>*/}
        <h2 className={s.title}>Сторінки не існує</h2>
        <h1 className={s.errorCodeText}>404</h1>
        <button className={'button'}>{homeIcon()}На головну</button>
      </div>
    </section>
  );
};

export default NotFoundPage;
