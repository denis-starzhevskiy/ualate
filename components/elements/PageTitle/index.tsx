import React from 'react';
import s from './PageTitle.module.scss';

type PageTitleProps = {
  title: string;
};

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return <h2 className={s.pageTitle}>{title}</h2>;
};

export default PageTitle;
