import { BreadCrumbs } from '@/components/elements/BreadCrumbs/BreadCrumbs';
import React, { useEffect, useState } from 'react';
import PageTitle from '@/components/elements/PageTitle';
import s from './notifications.module.scss';
import NotificationsLayout from '@/components/layouts/NotificationsLayout';
import Checkbox from '@/components/elements/CheckBox/CheckBox';
import Select from '@/components/elements/Select';
import clsx from 'clsx';
import Divider from '@/components/elements/Divider';
import Button from '@/components/elements/Button';
import Modal from '@/components/elements/Modal';
import Image from 'next/image';
import closeIcon from '@/public/images/closeIcon.svg';
import trashIcon from '@/public/images/trash.svg';
import { useQuery } from '@tanstack/react-query';
import { getNotifications } from '@/api/notificationAPI';
import Loader from '@/components/elements/Loader/Loader';
import FetchError from '@/components/elements/FetchError/FetchError';
import { createEnumParam, QueryParamConfig, useQueryParams, withDefault } from 'use-query-params';

export const getNotificationQueryParams: {
  action_object_object_id: QueryParamConfig<
    | 'error_in_text'
    | 'translation_transfer'
    | 'translation_received'
    | 'ad_status_change'
    | 'new_chapters'
    | 'new_chapter_translation'
    | 'translation_status_change'
    | 'unsubscribe_chapter'
    | 'chapter_comment'
    | 'book_comment'
  >;
  time_range: QueryParamConfig<'last_day' | 'last_week' | 'last_month'>;
} = {
  action_object_object_id: createEnumParam([
    'error_in_text',
    'translation_transfer',
    'translation_received',
    'ad_status_change',
    'new_chapters',
    'new_chapter_translation',
    'translation_status_change',
    'unsubscribe_chapter',
    'chapter_comment',
    'book_comment',
  ]),
  time_range: withDefault(createEnumParam(['all', 'last_day', 'last_week', 'last_month']), 'all'),
};

export default function NotificationPage() {
  const [filters, setFilters] = useQueryParams(getNotificationQueryParams);
  const { isLoading, data, isError } = useQuery(['notifications', { ...filters }], () =>
    getNotifications(filters)
  );

  return (
    <div className={clsx('container', s.container)}>
      <BreadCrumbs
        path={[
          { title: 'Головна', link: '/' },
          { title: 'Профіль', link: '/profile' },
          { title: 'Повідомлення', link: '' },
        ]}
      />
      <PageTitle title="Сповіщення" />
      <NotificationsLayout
        leftSide={<LeftSide filters={filters} setFilters={setFilters} />}
        rightSide={
          <RightSide
            notifications={data?.results || []}
            filters={filters}
            setFilter={setFilters}
            isLoading={isLoading}
            isError={isError}
          />
        }
      />
    </div>
  );
}

const Filters = ({ filters, setFilter }: { filters: {}; setFilter: (prev) => void }) => {
  const checkboxesValues = [
    {
      title: 'Помилка у тексті',
      value: 'error_in_text',
    },
    { title: 'Передача перекладу іншому', value: 'translation_transfer' },
    { title: 'Отримання перекладу від іншого', value: 'translation_received' },
    { title: 'Зміна статусу замовлення реклами у соцмережах', value: 'ad_status_change' },
    { title: 'Вихід нових розділів', value: 'new_chapters' },
    { title: 'Новий розділ у перекладі', value: 'new_chapter_translation' },
    { title: 'Зміна статусу перекладу', value: 'translation_status_change' },
    { title: 'Коментар до глави', value: 'unsubscribe_chapter' },
    { title: 'Коментар до книги', value: 'book_comment' },
  ];

  return (
    <>
      {checkboxesValues.map((value) => (
        <Checkbox
          key={value.value}
          label={value.title}
          checked={filters.action_object_object_id === value.value}
          onChange={(e) => {
            if (e.target.checked) {
              setFilter((prev) => {
                return { ...prev, action_object_object_id: value.value };
              });
            } else {
              setFilter((prev) => {
                return { ...prev, action_object_object_id: undefined };
              });
            }
          }}
        />
      ))}
      {/*<Button className={s.saveButton}>*/}
      {/*  {saveDataIcon()}*/}
      {/*  Зберегти*/}
      {/*</Button>*/}
    </>
  );
};

const LeftSide = ({ filters, setFilters }: { filters: {}; setFilters: (prev: any) => void }) => {
  return <Filters filters={filters} setFilter={setFilters} />;
};

type MobileFiltersModalProps = {
  open?: boolean;
  onClose?: () => void;
  filters: {};
  setFilter: (prev) => void;
};

const MobileFiltersModal = ({ open, onClose, filters, setFilter }: MobileFiltersModalProps) => {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset';
  }, [open]);

  return (
    <Modal open={open} className={s.modal}>
      <div className={s.modalContainer}>
        <Image className={s.closeIcon} src={closeIcon} alt={'close modal'} onClick={onClose} />
        <Filters filters={filters} setFilter={setFilter} />
      </div>
    </Modal>
  );
};

const RightSide = ({
  notifications,
  filters,
  setFilter,
  isLoading,
  isError,
}: {
  notifications: { verb: string; timestamp: string }[];
  filters: {};
  setFilter: (prev) => void;
  isLoading: boolean;
  isError: boolean;
}) => {
  const [openMobileFiltersModal, setOpenMobileFiltersModal] = useState(false);

  return (
    <div>
      <MobileFiltersModal
        open={openMobileFiltersModal}
        onClose={() => setOpenMobileFiltersModal(false)}
        filters={filters}
        setFilter={setFilter}
      />
      <Button
        className={clsx(s.mobileFiltersButton, 'fontsize14')}
        onClick={() => setOpenMobileFiltersModal(true)}>
        Фільтри
      </Button>
      <div className={s.section}>
        <div
          className={clsx(
            'color-light-grey',
            'fontsize14'
          )}>{`Показано ${notifications.length} сповіщення`}</div>
        <div className={s.sortContainer}>
          <div className={clsx('color-light-grey', 'fontsize14')}>Показати сповіщення</div>
          <Select
            customClass={s.sortSelect}
            value={filters.time_range}
            options={[
              { title: 'Всі', value: 'all' },
              { title: 'За 1 день', value: 'last_day' },
              { title: 'За 7 днів', value: 'last_week' },
              { title: 'За останній місяць', value: 'last_month' },
            ].map((value) => ({ label: value.title, value: value.value }))}
            onChange={(value) => {
              setFilter((prev) => {
                return { ...prev, time_range: value };
              });
            }}
          />
        </div>
      </div>
      <Divider style={{ marginBottom: 40, marginTop: 30 }} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isError ? (
            <FetchError />
          ) : (
            <>
              {notifications?.length === 0 ? (
                <p style={{ textAlign: 'center' }}>Повідомлень не знайдено.</p>
              ) : (
                <>
                  <div>
                    {notifications?.map((notification, index) => (
                      <div key={index} className={s.notification}>
                        <h5 className={s.title}>Розділ 1</h5>
                        <p className={s.content}>{notification.verb}</p>
                        <button className={s.deleteButton}>Видалити</button>
                      </div>
                    ))}
                  </div>
                  <Button>
                    <Image src={trashIcon} alt="delete selected letters" />
                    Видалити всі
                  </Button>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
