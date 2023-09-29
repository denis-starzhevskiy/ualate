import Link from 'next/link';
import React from 'react';

import s from './Navigation.module.scss';

type NavigationListProps = {
  link: string;
  label: string;
};

const Navigation = ({ onClose }: { onClose?: () => void }) => {
  const navigation: NavigationListProps[] = [
    {
      link: `/`,
      label: `Головна`,
    },
    {
      link: `/catalog`,
      label: `Каталог`,
    },
    {
      link: `/translators`,
      label: `Перекладачі`,
    },
    {
      link: `/left-translations`,
      label: `Покинуті переклади`,
    },
    {
      link: `/faq`,
      label: `FAQ`,
    },
  ];

  return (
    <div className={s.navigation}>
      <nav aria-label="Navigation">
        <ul>
          {navigation &&
            navigation.map((item, index) => (
              <li key={index}>
                <Link href={item.link} onClick={onClose}>
                  {item.label}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
