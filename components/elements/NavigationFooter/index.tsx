import Link from 'next/link';
import React from 'react';

import s from './NavigationFooter.module.scss';

type NavigationFooterListProps = {
  link: string;
  label: string;
};

const NavigationFooter = () => {
  const navigation: NavigationFooterListProps[] = [
    {
      link: `/`,
      label: `Для правовласників`,
    },
    {
      link: `/`,
      label: `Сказати «дякую!»`,
    },
    {
      link: `/`,
      label: `Угода користувача`,
    },
    {
      link: `/`,
      label: `Запропонувати покращення`,
    },
    {
      link: `/`,
      label: `Справка`,
    },
    {
      link: `/`,
      label: `Контакти`,
    },
    {
      link: `/`,
      label: `Не поповнився баланс?`,
    },

    {
      link: `/`,
      label: `Написати у підтримку`,
    },
  ];

  return (
    <div className={s.navigation}>
      <nav aria-label="Navigation Footer">
        <ul>
          {navigation.map((item, index) => (
            <li key={index}>
              <Link href={item.link}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavigationFooter;
