import React from 'react';
import s from './Abonement.module.scss';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

type AbonementProps = {
  abonements: {
    name: string;
    sections: number;
    priceInCoins: number;
  }[];
};

const Abonement = ({ abonements }: AbonementProps) => {
  const { register, formState: {errors} } = useFormContext();

  return (
    <table className={s.table}>
      <tbody>
        <tr>
          <th className={clsx(s.th, s.commonTdTh)} scope={'row'} style={errors?.abonement?.price && {color: 'red'}}>
            Вартість передплати за 1 розділ
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>
            <input
              type={'text'}
              className={clsx('input', s.input)}
              {...register('abonement.price')}
            />
            {errors?.abonement?.price && <label className={s.errorLabel}>{errors.abonement.price.message}</label>}
            <h4 className={s.coinsLabel}>UAcoins</h4>
          </td>
        </tr>
        <tr>
          <th className={clsx(s.th, s.commonTdTh)} scope={'row'} style={errors?.abonement?.discount && {color: 'red'}}>
            Знижка % (при покупці від 10 розділів)
          </th>
          <td className={clsx(s.td, s.commonTdTh)}>
            <input
              type={'text'}
              className={clsx('input', s.input)}
              {...register('abonement.discount')}
            />
            {errors?.abonement?.discount && <label className={s.errorLabel}>{errors.abonement.discount.message}</label>}
            <h4 className={s.coinsLabel}>UAcoins</h4>
          </td>
        </tr>
        {abonements.map((item, idx) => {
          return (
            <tr key={idx} className={clsx(idx === abonements.length - 1 && s.borderBottomNone)}>
              <th className={clsx(s.th, s.commonTdTh)} scope={'row'}>
                {item.name}
              </th>
              <td className={clsx(s.td, s.commonTdTh)}>
                <div className={s.abonementContainer}>
                  <div className={s.inputLabelContainer}>
                    <input
                      type={'text'}
                      className={clsx('input', s.smallInput)}
                      defaultValue={item.sections}
                      {...register(`abonement.chapters[${idx}].chapters_count`)}
                    />
                    <h4 className={s.coinsLabel}>Pозділів</h4>
                  </div>
                  <div className={s.inputLabelContainer}>
                    <input
                      type={'text'}
                      className={clsx('input', s.smallInput)}
                      defaultValue={item.priceInCoins}
                      {...register(`abonement.chapters[${idx}].price`)}
                    />
                    <h4 className={s.coinsLabel}>UAcoins</h4>
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Abonement;
