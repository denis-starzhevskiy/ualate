import React from 'react';
import s from './AccessRights.module.scss';
import Checkbox from '@/components/elements/CheckBox/CheckBox';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

const permissions = [
  {
    title: 'Хто може коментувати книгу',
    value: 'comment_book',
  },
  {
    title: 'Хто може коментувати розділи',
    value: 'comment_chapter',
  },
  {
    title: 'Хто може увійти на сторінку книги',
    value: 'view_book',
  },
  {
    title: 'Хто може скачати',
    value: 'download_book',
  },
  {
    title: 'Хто може оцінити',
    value: 'review_book',
  },
];

const AccessRights = () => {
  const { getValues, setValue } = useFormContext();

  return (
    <div className={s.container}>
      <div className={clsx(s.rowContainer, s.headerContainer)}>
        <h4 className={s.textAlignStart}>Що можуть робити</h4>
        <h4>Усі</h4>
        <h4>Модератори</h4>
        <h4>Ніхто</h4>
      </div>
      {permissions.map((item, idx) => {
        return (
          <div key={idx} className={clsx(s.rowContainer, s.bottomBorder)}>
            <h4 className={s.permissionText}>{item.title}</h4>
            <div className={s.centered}>
              <Checkbox
                customClass={s.checkBoxComponent}
                checked={getValues(`access_rights.${item.value}`) === 'all'}
                onChange={() => setValue(`access_rights.${item.value}`, 'all')}
              />
            </div>
            <div className={s.centered}>
              <Checkbox
                customClass={s.checkBoxComponent}
                checked={getValues(`access_rights.${item.value}`) === 'moderators'}
                onChange={() => setValue(`access_rights.${item.value}`, 'moderators')}
              />
            </div>
            <div className={s.centered}>
              <Checkbox
                customClass={s.checkBoxComponent}
                checked={getValues(`access_rights.${item.value}`) === 'nobody'}
                onChange={() => setValue(`access_rights.${item.value}`, 'nobody')}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccessRights;
