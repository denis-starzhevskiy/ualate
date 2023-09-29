import { BreadCrumbs } from '@/components/elements/BreadCrumbs/BreadCrumbs';
import React from 'react';
import PageTitle from '@/components/elements/PageTitle';
import Link from 'next/link';
import s from './faq.module.scss';
import clsx from 'clsx';

export default function CatalogPage() {
  return (
    <div className={clsx('container', s.container)}>
      <BreadCrumbs
        path={[
          { title: 'Головна', link: '/' },
          { title: 'Головна книги', link: '/' },
        ]}
      />
      <PageTitle title="FAQ" />
      <div className={s.mainContainer}>
        <h4 className={clsx('color-white', s.title)}>Як користуватись сайтом</h4>
        <p className={clsx('color-white', s.paragraph)}>
          Ласкаво просимо в систему перекладів «UA Translate». Цей сайт призначений для
          професійних мов любительських перекладів будь-яких новелів, фанфіків, ранобе з різних мов.
          Ваші улюблені ранобе, новели та інше на українській мові!
        </p>
        <Link href={'/'} className={'link'}>
          Як створити переклад на сайті UAlate.com
        </Link>
        <Link href={'/'} className={'link'}>
          Налаштування перекладу
        </Link>
        <Link href={'/'} className={'link'}>
          Теги / жанри / фендоми
        </Link>
        <Link href={'/'} className={'link'}>
          Як створити перший розділ у перекладі
        </Link>
        <Link href={'/'} className={'link'}>
          Реклама вашого перекладу на сайті
        </Link>
        <Link href={'/'} className={'link'}>
          Як поповнити баланс
        </Link>
        <Link href={'/'} className={'link'}>
          Як знайти цікаву розповідь
        </Link>
        <Link href={'/'} className={'link'}>
          Помилки у тексті
        </Link>
        <Link href={'/'} className={'link'}>
          Коментарі
        </Link>
      </div>
    </div>
  );
}
