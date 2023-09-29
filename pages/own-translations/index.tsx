import { BreadCrumbs } from '@/components/elements/BreadCrumbs/BreadCrumbs';
import React, { useEffect, useState } from 'react';
import PageTitle from '@/components/elements/PageTitle';
import CatalogLayout from '@/components/layouts/CatalogLayout';
import Image from 'next/image';
import s from './own-translations.module.scss';
import clsx from 'clsx';
import Link from 'next/link';
import Divider from '@/components/elements/Divider';
import Modal from '@/components/elements/Modal';
import closeIcon from '@/public/images/closeIcon.svg';
import Button from '@/components/elements/Button';
import { useQuery } from '@tanstack/react-query';
import { getStatistic, StatisticProps } from '@/api/statisticAPI';
import { getUserProfile } from '@/api/profileAPI';
import { useAuthStore } from '@/store/authStore';
import { BookProps } from '@/components/elements/Book';
import FetchError from '@/components/elements/FetchError/FetchError';
import { me } from '@/api/authAPI';

export default function OwnTranslationsPage() {
  const { id: userId } = useAuthStore((state) => state.user);

  const { data: resultAuth } = useQuery(['me'], () => me());

  const { data } = useQuery(['own-translations', userId], () => getUserProfile(resultAuth?.id));

  const { data: statisticData } = useQuery(['statistic'], () => getStatistic(), {});

  return (
    <div className={'container'}>
      <BreadCrumbs
        path={[
          { title: 'Головна', link: '/' },
          { title: 'Профіль', link: '/profile' },
          { title: 'Власні переклади', link: '' },
        ]}
      />
      <PageTitle title="Власні переклади" />
      <CatalogLayout
        leftSide={
          data?.bought_books ? <LeftSide ownTranslations={data.bought_books} /> : <FetchError />
        }
        rightSide={statisticData ? <RightSide statistic={statisticData} /> : <></>}
      />
    </div>
  );
}

const LeftSide = ({ ownTranslations }: { ownTranslations: BookProps[] }) => {
  const [openMobileFiltersModal, setOpenMobileFiltersModal] = useState(false);

  return (
    <div className={s.marginBottom102}>
      <MobileFiltersModal
        open={openMobileFiltersModal}
        onClose={() => setOpenMobileFiltersModal(false)}
      />
      <Button className={s.mobileStatisticsButton} onClick={() => setOpenMobileFiltersModal(true)}>
        Статистика діяльності
      </Button>
      {ownTranslations && ownTranslations.length > 0 ? (
        <>
          <div className={s.booksList}>
            {ownTranslations.map((item) => (
              <Link key={item.id} href={`/books/${item.id}`}>
                <Image
                  src={item.main_photo.slice(0, 17) + '/api' + item.main_photo.slice(17)}
                  alt="book image"
                  className={s.bookImage}
                />
                <table className={s.table}>
                  <tbody>
                    <tr>
                      <th scope="row">Дата створення</th>
                      <td>{item.created}</td>
                    </tr>
                    <tr>
                      <th scope="row">Дата останньої активності</th>
                      <td>{item.last_edit}</td>
                    </tr>
                    <tr>
                      <th scope="row">Перегляд за день</th>
                      <td>{item.price}</td>
                    </tr>
                    <tr>
                      <th scope="row">Дохід за день</th>
                      <td>{item.price_chapter}$</td>
                    </tr>
                    <tr>
                      <th scope="row">Дохід за місяць</th>
                      <td>{item.price}$</td>
                    </tr>
                  </tbody>
                </table>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <p style={{ textAlign: 'center' }}>Власні переклади відсутні.</p>
      )}
    </div>
  );
};

type MobileFiltersModalProps = { open?: boolean; onClose?: () => void };

const MobileFiltersModal = ({ open, onClose }: MobileFiltersModalProps) => {
  const { data: statisticData } = useQuery(['statistic'], () => getStatistic(), {});

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset';
  }, [open]);

  return (
    <Modal open={open} className={s.modal}>
      <div className={s.modalContainer}>
        <Image className={s.closeIcon} src={closeIcon} alt={'close modal'} onClick={onClose} />
        {statisticData && <Statistics statisticData={statisticData} />}
      </div>
    </Modal>
  );
};

const RightSide = ({ statistic }: { statistic: StatisticProps }) => {
  return (
    <div className={s.desktopStatisticsContainer}>
      <Statistics statisticData={statistic} />
    </div>
  );
};

const Statistics = ({ statisticData }: { statisticData: StatisticProps }) => {
  return (
    <div>
      <h3 className={s.activityStatisticsTitle}>Статистика діяльності</h3>
      <div>
        <div className={clsx('color-white', s.categoryName)}>Перекладів</div>
        <div className={clsx('color-dark', s.number)}>{statisticData?.all_books}</div>
        <Divider className={s.my20} />
        <div className={clsx('color-white', s.categoryName)}>Сторінок переклав</div>
        <div className={clsx('color-dark', s.number)}>{statisticData?.all_books}</div>
        <Divider className={s.my20} />
        <div className={clsx('color-white', s.categoryName)}>Символів переклав</div>
        <div className={clsx('color-dark', s.number)}>{statisticData?.all_characters}</div>
        <Divider className={s.my20} />
        <div className={s.commission}>
          <div className={s.commissionNumber}>{statisticData?.income}%</div>
          <div className={'color-white'}>Комісія</div>
        </div>
      </div>
    </div>
  );
};
