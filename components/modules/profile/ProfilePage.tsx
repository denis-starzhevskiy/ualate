import React from 'react';
import clsx from 'clsx';
import s from './ProfilePage.module.scss';
import { BreadCrumbs } from '@/components/elements/BreadCrumbs/BreadCrumbs';
import {
  addMoreRoundedIcon,
  bookMarkIcon,
  fileIcon,
  letterIcon,
  noticeIcon,
  settingIcon,
} from '@/components/modules/icons';
import Divider from '@/components/elements/Divider';
import { useRouter } from 'next/router';

type ProfileProps = {
  user?: string;
  photo?: string | null;
  balance?: number;
  register_date?: string;
  commission?: number;
  is_staff?: boolean;
  bought_books?: object[];
  looked?: number;
  income?: string;
  sold?: number;
  like?: number;
  in_marks?: number;
  all_characters?: number;
  all_comments?: number;
  all_books?: number;
};

const ProfilePage = ({ userData }: { userData: ProfileProps }) => {
  const router = useRouter();

  const userInfo = {
    currentBudget: userData.balance,
    registrationDate: userData.register_date,
    daysExists: 0,
    translationNumber: userData.all_books,
    pagesTranslatedNumber: userData.all_books,
    symbolsTranslatedNumber: userData.all_characters,
    commentsNumber: userData.all_comments,
  };

  return (
    <section className={clsx(s.section)}>
      <div className="container">
        <BreadCrumbs
          path={[
            { title: 'Головна', link: '/' },
            { title: 'Профіль', link: '/books/543543' },
          ]}
        />
        <h2 className={s.title}>ПРОФІЛЬ</h2>
        <div className={s.tabsContainer}>
          <button
            onClick={() => router.push('/own-translations')}
            className={clsx('button', s.tabButton)}>
            {fileIcon()}Власні переклади
          </button>
          <button onClick={() => router.push('/bookmarks')} className={clsx('button', s.tabButton)}>
            {bookMarkIcon()}Закладки
          </button>
          <button
            onClick={() => router.push('/create-translation')}
            className={clsx('button', s.tabButton)}>
            {addMoreRoundedIcon()}Створити переклад
          </button>
          <button onClick={() => router.push('/mail')} className={clsx('button', s.tabButton)}>
            {letterIcon()}Пошта
          </button>
          <button
            onClick={() => router.push('/notifications')}
            className={clsx('button', s.tabButton)}>
            {noticeIcon()}Сповіщення
          </button>
          <button
            onClick={() => router.push('/profile/settings')}
            className={clsx('button', s.tabButton)}>
            {settingIcon()}Налаштування
          </button>
        </div>
        <h4 className={clsx(s.mainTitle)}>Статистика</h4>
        <div className={s.dateExistsStatsContainer}>
          <h4 className={clsx(s.subTitle)}>Разом з нами:</h4>
          <p className={s.userDataText}>{`з ${userInfo.registrationDate}`}</p>
        </div>
        <Divider className={s.divider} />
        <div className={s.shortStatsContainer}>
          <p className={clsx(s.subTitle)}>Перекладів</p>
          <p className={clsx(s.subTitle)}>Сторінок переклав</p>
          <p className={clsx(s.subTitle)}>Символів переклав</p>
          <p className={clsx(s.subTitle)}>Прокоментував</p>
          <p className={s.userDataText}>{userInfo.translationNumber}</p>
          <p className={s.userDataText}>{userInfo.pagesTranslatedNumber}</p>
          <p className={s.userDataText}>{userInfo.symbolsTranslatedNumber}</p>
          <p className={s.userDataText}>{userInfo.commentsNumber}</p>
        </div>
        <Divider className={s.divider} />
        <div className={s.balanceStatsContainer}>
          <h4 className={clsx(s.subTitle)}>Баланс:</h4>
          <div className={s.actionsContainer}>
            <p className={s.userDataText}>{userInfo.currentBudget}</p>
            <button className={clsx('button', s.tabButton)}>Поповнити</button>
            <button className={clsx('button', s.tabButton)}>Вивести</button>
          </div>
          <p className={clsx(s.subTitle)}>Комісія: 15%</p>
        </div>
        <Divider className={s.divider} />
        <button
          onClick={() => router.push('/profile/detailed-statistic')}
          className={clsx('button', s.detailedInformationBtn)}>
          Детальна статистика переглядів
        </button>
      </div>
    </section>
  );
};

export default ProfilePage;
