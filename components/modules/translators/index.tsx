import React, { useEffect } from 'react';
import clsx from 'clsx';
import s from './Translators.module.scss';
import { BreadCrumbs } from '@/components/elements/BreadCrumbs/BreadCrumbs';
import Select from '@/components/elements/Select';
import Divider from '@/components/elements/Divider';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { getTranslators } from '@/api/translatorsAPI';
import { withCSR } from '@/utils/with-CSR';
import Loader from '@/components/elements/Loader/Loader';
import FetchError from '@/components/elements/FetchError/FetchError';
import { useSortFilter } from '@/hooks/useSortFilter';
import { StringParam, useQueryParam } from 'use-query-params';

type TranslatorsProps = {
  translators?: {
    first_name?: string;
    last_name: string;
    book_count: number;
    comment_count: number;
  }[];
  isLoading: boolean;
  isError: boolean;
};

const TranslatorsView = ({ isLoading, isError }: TranslatorsProps) => {
  const isMobile = useMediaQuery('991.98');
  const [sortFilter, setSortFilter] = useQueryParam('ordering', StringParam);
  const { data } = useQuery(['translators'], () => getTranslators(sortFilter));
  const { sortType, setOptionByName } = useSortFilter();

  useEffect(() => {
    setSortFilter(sortType === 'title' ? 'comment_count' : sortType);
  }, [setSortFilter, sortType]);

  return (
    <section className={clsx(s.section)}>
      <div className="container">
        <BreadCrumbs
          path={[
            { title: 'Головна', link: '/' },
            { title: 'Перекладачі', link: '' },
          ]}
        />
        <h2 className={s.title}>ПЕРЕКЛАДАЧІ</h2>
        <div className={s.translatorsTableContainer}></div>
        <div className={s.headerContainer}>
          <div className={s.subText}>{`Показано ${(data && data.count) || ''} перекладачів`}</div>
          <div style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
            <div className={s.subText}>Сортувати за</div>
            <Select
              value={'місце в рейтингу'}
              onChange={(option) => setOptionByName(option)}
              options={[
                'місце в рейтингу',
                'кількість книг',
                'кількість коментарів',
                'останнє відвідування',
              ].map((value) => ({ label: value, value }))}
              customClass={s.customSelect}
            />
          </div>
        </div>
        <Divider />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {isError ? (
              <FetchError />
            ) : (
              <>
                <table className={s.translatorsTable}>
                  <thead>
                    <tr>
                      <th>{isMobile ? 'Місце' : 'Місце в рейтингу'}</th>
                      <th>Нікнейм</th>
                      <th>{isMobile ? 'Книги' : 'Кількість книг'}</th>
                      <th>{isMobile ? 'Коментарі' : 'Кількість коментарів'}</th>
                      <th>Останнє відвідування</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.results.map((item) => {
                        return (
                          <tr key={item.book_count}>
                            <td>
                              <h4 className={s.ratingPlaceNumber}>{item.book_count}</h4>
                            </td>
                            <td>
                              <h4>{item.first_name + ' ' + item.last_name}</h4>
                            </td>
                            <td>
                              <h4>{item.book_count}</h4>
                            </td>
                            <td>
                              <h4>{item.comment_count}</h4>
                            </td>
                            <td>
                              <h4>{'2020-09-04'}</h4>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export const getServerSideProps = withCSR(async () => {
  const queryClient = new QueryClient();

  let isError = false;

  try {
    await queryClient.fetchQuery(['translators'], () => getTranslators());
  } catch (error) {
    isError = true;
  }

  return {
    props: {
      isError,
      dehydratedState: dehydrate(queryClient),
    },
  };
});

export default TranslatorsView;
