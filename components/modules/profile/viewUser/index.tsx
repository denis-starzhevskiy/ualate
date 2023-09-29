import React from 'react';
import clsx from 'clsx';
import s from './ViewUserPage.module.scss';
import { BreadCrumbs } from '@/components/elements/BreadCrumbs/BreadCrumbs';
import { letterIcon } from '@/components/modules/icons';
import Divider from '@/components/elements/Divider';

type UserInfoProps = {
  userInfo: {
    user?: string;
    photo?: string | null;
    balance?: string;
    register_date?: string;
    commission?: number;
    is_staff?: boolean;
    bought_books?: object[];
  };
};

const Index = ({ userInfo }: UserInfoProps) => {
  const userData = {
    user: 'Oleksandr',
    register_date: '22.02.2023',
    translationNumber: 54,
    pagesTranslatedNumber: 43,
    symbolsTranslatedNumber: 434,
    commentsNumber: 2,
  };

  const resultData = { ...userData, ...userInfo };

  return (
    <section className={clsx(s.section)}>
      <div className="container">
        <BreadCrumbs
          path={[
            { title: 'Головна', link: '/' },
            { title: 'Профіль', link: '/books/543543' },
          ]}
        />
        <h2 className={s.title}>{`ПРОФІЛЬ: ${resultData.user.toUpperCase()}`}</h2>
        <div className={s.tabsContainer}>
          <button className={clsx('button', s.tabButton)}>{letterIcon()}Написати</button>
          <button className={clsx('button', s.tabButton)}>Підтримати фінансово</button>
        </div>
        <h4 className={clsx(s.subTitle)}>Статистика</h4>
        <div className={s.dateExistsStatsContainer}>
          <h4 className={clsx(s.subTitle)} style={{ fontSize: '16px' }}>
            Разом з нами:
          </h4>
          <h4 className={s.userDataText}>{`з ${userData.register_date}`}</h4>
        </div>
        <Divider className={s.divider} />
        <div className={s.shortStatsContainer}>
          <h4 className={clsx(s.subTitle)}>Перекладів</h4>
          <h4 className={clsx(s.subTitle)}>Сторінок переклав</h4>
          <h4 className={clsx(s.subTitle)}>Символів переклав</h4>
          <h4 className={clsx(s.subTitle)}>Прокоментував</h4>
          <h4 className={s.userDataText}>{userData.translationNumber}</h4>
          <h4 className={s.userDataText}>{userData.pagesTranslatedNumber}</h4>
          <h4 className={s.userDataText}>{userData.symbolsTranslatedNumber}</h4>
          <h4 className={s.userDataText}>{userData.commentsNumber}</h4>
        </div>
        <Divider className={s.divider} />
      </div>
    </section>
  );
};

export default Index;
