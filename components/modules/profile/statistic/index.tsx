import React from 'react';
import clsx from 'clsx';
import s from './Statistic.module.scss';
import { BreadCrumbs } from '@/components/elements/BreadCrumbs/BreadCrumbs';

type StatisticProps = {
  statistic?: {
    looked: number;
    income: string;
    sold: number;
    like: number;
    in_marks: number;
  };
};

const StatisticView = ({ statistic: receivedStatistic }: StatisticProps) => {
  const statistic = receivedStatistic || {
    looked: 4324,
    income: '3543.5',
    sold: 43,
    like: 94,
    in_marks: 17,
  };

  return (
    <section className={clsx(s.section)}>
      <div className="container">
        <BreadCrumbs
          path={[
            { title: 'Головна', link: '/' },
            { title: 'Профіль', link: '/profile' },
            { title: 'Детальна статистика переглядів', link: '/books/543543' },
          ]}
        />
        <h2 className={s.title}>ДЕТАЛЬНА СТАТИСТИКА ПЕРЕГЛЯДІВ</h2>
        <h4 className={clsx(s.subTitle, s.rowGaps)}>Статистика</h4>
        <table className={s.table}>
          <tbody>
            <tr>
              <th></th>
              <th>Переглядів</th>
              <th>Дохід</th>
              <th>Купили</th>
              <th>Лайків</th>
              <th>В закладах</th>
            </tr>
            <tr>
              <th scope={'row'}>Загалом</th>
              <td>{statistic.looked}</td>
              <td>{statistic.income}</td>
              <td>{statistic.sold}</td>
              <td>{statistic.like}</td>
              <td>{statistic.in_marks}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default StatisticView;
