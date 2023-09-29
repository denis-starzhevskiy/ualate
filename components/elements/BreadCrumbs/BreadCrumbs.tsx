import React from 'react';

import s from './BreadCrumbs.module.scss';
import Link from 'next/link';

type BreadCrumbsProps = {
  path: {
    title: string;
    link: string;
  }[];
};

export const BreadCrumbs = ({ path }: BreadCrumbsProps) => {
  return (
    <div className={s.breadcrumbs}>
      {path.map((item, i) => (
        <React.Fragment key={i}>
          {i !== 0 && <p> {' > '} </p>}
          <Link href={item.link}>{item.title}</Link>
        </React.Fragment>
      ))}
    </div>
  );
};
