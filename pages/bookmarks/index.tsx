import { BreadCrumbs } from '@/components/elements/BreadCrumbs/BreadCrumbs';
import React, { useEffect, useState } from 'react';
import PageTitle from '@/components/elements/PageTitle';
import s from './bookmarks.module.scss';
import Book, { BookProps } from '@/components/elements/Book';
import CatalogLayout from '@/components/layouts/CatalogLayout';
import Select from '@/components/elements/Select';
import Menu from '@/components/elements/Menu';
import Divider from '@/components/elements/Divider';
import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';
import { getLikedBooks } from '@/api/bookmarkAPI';
import Loader from '@/components/elements/Loader/Loader';
import FetchError from '@/components/elements/FetchError/FetchError';
import { optionsTitles, useSortFilter } from '@/hooks/useSortFilter';
import Pagination from '@/components/elements/Pagination/Pagination';
import { BookApiProps, getBookById } from '@/api/bookAPI';

export default function BookmarksPage() {
  const [page, setPage] = useState(1);
  const { isLoading, data, isError } = useQuery(['bookmarks'], () => getLikedBooks());
  const [bookMarks, setBookMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredState, setFilteredState] = useState<BookProps[]>([]);

  useEffect(() => {
    if (data) {
      let bookmarks = [];
      Promise.all(
        data.results.map(async (item) => {
          return await getBookById(item.book);
        })
      ).then((result) => {
        setBookMarks(result);
        setLoading(false);
      });
    }
  }, [data]);

  return (
    <div className={'container'}>
      <BreadCrumbs
        path={[
          { title: 'Головна', link: '/' },
          { title: 'Профіль', link: '/profile' },
          { title: 'Закладки', link: '/' },
        ]}
      />
      <PageTitle title="Закладки" />
      {!loading ? (
        <CatalogLayout
          leftSide={
            <LeftSide
              data={bookMarks}
              filteredState={filteredState}
              isLoading={isLoading}
              isError={isError}
              page={page}
              setPage={setPage}
            />
          }
          rightSide={<RightSide />}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
}

const LeftSide = ({
  filteredState,
  data,
  isLoading,
  isError,
  page,
  setPage,
}: {
  filteredState: BookProps[];
  data: BookApiProps;
  isLoading: boolean;
  isError: boolean;
  page: number;
  setPage: (page: number) => void;
}) => {
  const { sortType, setOptionByName } = useSortFilter();

  return (
    <div className={s.marginBottom102}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isError ? (
            <FetchError />
          ) : (
            <>
              <div className={s.section}>
                <div
                  className={clsx(
                    'color-light-grey',
                    'fontsize14'
                  )}>{`Показано ${data.count} робіт`}</div>
                <div className={s.sortContainer}>
                  <div className={clsx('color-light-grey', 'fontsize14')}>Сортувати за</div>
                  <Select
                    value={'назвою'}
                    onChange={(option) => setOptionByName(option)}
                    options={optionsTitles.map((value) => ({ label: value, value }))}
                  />
                </div>
              </div>
              <div className={clsx(s.sortContainer, s.mobileFiltersSelect)}>
                <div className={clsx('color-light-grey', 'fontsize14')}>Категорії</div>
                <Select
                  options={['Усі', 'Читаю', 'У планах', 'Кинув', 'Прочитав'].map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  value={'Усі'}
                />
              </div>
              <Divider style={{ marginBottom: 40, marginTop: 30 }} />
              {data && data.length === 0 && (
                <p style={{ textAlign: 'center' }}>Закладок не знайдено.</p>
              )}
              <div className={s.booksList}>
                {data &&
                  data
                    .sort((a, b) => {
                      if (a?.[sortType] < b?.[sortType]) {
                        return -1;
                      } else {
                        return 1;
                      }
                    })
                    .map((item: BookProps) => (
                      <div key={item.id} className={s.booksListItem}>
                        <Book
                          id={item.id}
                          title={item.title}
                          main_photo={item.main_photo}
                          created={item.created}
                          price={item.price}
                        />
                      </div>
                    ))}
              </div>
              <div className={s.showMoreButtonContainer}>
                <Pagination
                  count={data.count}
                  currentPage={page}
                  entities={data.results}
                  onChangePage={(idx) => {
                    setPage(idx);
                  }}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

const RightSide = () => {
  return (
    <div className={s.desktopFiltersContainer}>
      <div>
        <h3 className={s.myBookmarksTitle}>Мої закладки</h3>
        <Menu
          value={'Усі'}
          menu={['Усі', 'Читаю', 'У планах', 'Кинув', 'Прочитав'].map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </div>
    </div>
  );
};
