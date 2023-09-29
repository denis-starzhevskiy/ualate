import GlobalSvgSelector from '@/components/GlobalSvgSelector';
import Link from 'next/link';
import React from 'react';
import s from './SocialFooter.module.scss';

type SocialProps = {
  link: string;
  icon: string;
};

const SocialFooter = () => {
  const list: SocialProps[] = [
    {
      link: `/`,
      icon: `facebook`,
    },
    {
      link: `/`,
      icon: `instagram`,
    },
  ];

  return (
    <div className={s.list}>
      <ul>
        {list &&
          list.map((item, index) => (
            <li key={index}>
              <Link href={item.link} target={'_blank'} rel={'noreferrer'}>
                <GlobalSvgSelector id={item.icon} />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SocialFooter;
