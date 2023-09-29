import React, { useState } from 'react';

import s from './Advertisement.module.scss';
import clsx from 'clsx';
import { successIcon } from '@/components/modules/icons';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Select from '@/components/elements/Select';
import CheckBox from '@/components/elements/CheckBox/CheckBox';

type AdvertisementProps = {
  advertisements: {
    name: string;
    subTitle: string;
    isGenre: boolean;
  }[];
};

type AdvertisementComponentProps = {
  advertisement: {
    name: string;
    subTitle: string;
    isGenre: boolean;
  };
  key: number;
};

const AdvertisementComponent = ({ advertisement, key }: AdvertisementComponentProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  const isMobile = useMediaQuery('991.98');
  return (
    <div key={key} className={clsx(s.rowContainer, checked && s.checkedItem)}>
      {isMobile ? (
        <div className={s.mobileTitle}>
          <CheckBox
            customClass={s.checkBoxComponent}
            checked={checked}
            onChange={() => setChecked((prev) => !prev)}
          />
          <div>
            <h4 className={s.titleText}>{advertisement.name}</h4>
            <h4 className={s.subTitleText}>{advertisement.subTitle}</h4>
          </div>
        </div>
      ) : (
        <>
          <CheckBox
            customClass={s.checkBoxComponent}
            checked={checked}
            onChange={() => setChecked((prev) => !prev)}
          />
          <div className={s.title}>
            <h4 className={s.titleText}>{advertisement.name}</h4>
            <h4 className={s.subTitleText}>{advertisement.subTitle}</h4>
          </div>
        </>
      )}
      <div className={s.inputsContainer}>
        <div className={s.datePickersContainer}>
          <input disabled={!checked} type={'date'} className={clsx('input', s.datePicker)}></input>
          <input disabled={!checked} type={'date'} className={clsx('input', s.datePicker)} />
        </div>
        {advertisement.isGenre && (
          <div>
            <label htmlFor={'genreSelect'} className={s.selectLabel}>
              Оберіть жанр
            </label>
            <Select
              disabled={!checked}
              value={'Триллер'}
              options={['Триллер', 'Фантастика'].map((value) => ({ label: value, value }))}
              customClass={s.customSelect}
            />
          </div>
        )}
      </div>
      <div className={s.orderButtonContainer}>
        <button className={clsx('button', s.orderButton, checked && s.checkedButton)}>
          {successIcon()}Замовити
        </button>
      </div>
    </div>
  );
};

const Advertisement = ({ advertisements }: AdvertisementProps) => {
  return (
    <>
      <h4
        className={
          s.alarmText
        }>{`* Увага, після натискання на кнопку "Замовити" вартість реклами автоматично списується з вашого балансу`}</h4>
      {advertisements.length > 0 && (
        <div className={s.container}>
          {advertisements.map((item, idx) => {
            return <AdvertisementComponent advertisement={item} key={idx} />;
          })}
        </div>
      )}
    </>
  );
};

export default Advertisement;
