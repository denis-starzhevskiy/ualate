import { BreadCrumbs } from '@/components/elements/BreadCrumbs/BreadCrumbs';
import React, { useEffect, useState } from 'react';
import PageTitle from '@/components/elements/PageTitle';
import s from './left-translations.module.scss';
import Book, { BookProps } from '@/components/elements/Book';
import CatalogLayout from '@/components/layouts/CatalogLayout';
import Select from '@/components/elements/Select';
import Search from '@/components/elements/Search';
import Filters from '@/components/elements/Filters';
import clsx from 'clsx';
import Divider from '@/components/elements/Divider';
import MobileFiltersModal from '@/components/elements/MobileFiltersModal';
import Button from '@/components/elements/Button';
import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { BookApiProps, getBooks } from '@/api/bookAPI';
import { useBooks, useSearch } from '@/hooks/api/useBooks';
import Loader from '@/components/elements/Loader/Loader';
import FetchError from '@/components/elements/FetchError/FetchError';
import { optionsTitles, useSortFilter } from '@/hooks/useSortFilter';
import Pagination from '@/components/elements/Pagination/Pagination';
import { useQueryParams } from 'use-query-params';
import { getBookQueryParams } from '@/pages/catalog';
import { useRouter } from 'next/router';

export const getServerSideProps = async (ctx: GetServerSideProps) => {
  const queryClient = new QueryClient();

  let isError = false;

  try {
    await queryClient.fetchQuery(['left-translations'], () => getBooks(1));
  } catch (error) {
    isError = true;
    // ctx.res.statusCode = error.response.status;
  }

  return {
    props: {
      isError,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function LeftTranslationsPage({ isError }: { isError: boolean }) {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useQueryParams(getBookQueryParams);
  const {
    isLoading,
    data,
    isError: isFetchError,
  } = useQuery(['books', { ...filters }], () => getBooks(filters), {
    keepPreviousData: true,
  });

  return (
    <div className={'container'}>
      <BreadCrumbs
        path={[
          { title: 'Головна', link: '/' },
          { title: 'Покинуті переклади', link: '' },
        ]}
      />
      <PageTitle title="Покинуті переклади" />
      <p className={clsx('color-white', s.marginBottom30, 'fontsize16')}>
        Забрати кинутий переклад можуть користувачі, які зарегистрировані на сайті більше 90 днів
      </p>
      <CatalogLayout
        leftSide={
          <LeftSide
            data={data}
            filteredState={data?.results}
            isError={isError}
            isLoading={isLoading}
            page={page}
            setPage={setPage}
            filterQuery={filters}
            setFilteredQuery={setFilters}
          />
        }
        rightSide={
          <div className={s.desktopFiltersContainer}>
            <Filters
              allBooks={data?.results}
              filteredQuery={filters}
              setFilteredQuery={setFilters}
            />
          </div>
        }
      />
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
  filterQuery,
  setFilteredQuery,
}: {
  filteredState: BookProps[];
  data: BookApiProps;
  isLoading: boolean;
  isError: boolean;
  page: number;
  setPage: (page: number) => void;
  filterQuery: {};
  setFilteredQuery: (prev: any) => void;
}) => {
  const router = useRouter();
  const [openMobileFiltersModal, setOpenMobileFiltersModal] = useState(false);
  const { sortType, setOptionByName } = useSortFilter();
  const [searchFilter, setSearchFilter] = useState<string | null>('');
  const { data: searchData } = useSearch(searchFilter);

  useEffect(() => {
    setFilteredQuery((prev) => {
      return { ...prev, ordering: sortType };
    });
  }, [setFilteredQuery, sortType]);

  return (
    <div className={s.marginBottom102}>
      <MobileFiltersModal
        open={openMobileFiltersModal}
        onClose={() => setOpenMobileFiltersModal(false)}
        filterQuery={filterQuery}
        setFilterQuery={setFilteredQuery}
      />
      <Search
        placeholder={'Пошук по покинутим перекладам'}
        icon={'search'}
        className={s.searchInputContainer}
        value={searchFilter || ''}
        onChangeValue={(value) => {
          if (!(value === '')) {
            setSearchFilter(value);
          } else {
            setSearchFilter(null);
          }
        }}
      />
      <div className={s.section}>
        <div className={clsx('color-light-grey', 'fontsize14')}>{`Показано ${
          data?.results?.length || 0
        } робіт`}</div>
        <div className={s.sortContainer}>
          <div className={clsx('color-light-grey', 'fontsize14')}>Сортувати за</div>
          <Select
            value={'назвою'}
            onChange={(option) => setOptionByName(option)}
            options={optionsTitles.map((value) => ({ label: value, value }))}
          />
        </div>
      </div>
      <Button className={s.mobileFiltersButton} onClick={() => setOpenMobileFiltersModal(true)}>
        Фільтри
      </Button>
      <Divider style={{ marginBottom: 40, marginTop: 30 }} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isError ? (
            <FetchError />
          ) : (
            <>
              {filteredState && (
                <>
                  {(searchFilter
                    ? searchData
                      ? searchData.results
                      : []
                    : filteredState
                    ? filteredState
                    : []
                  ).length === 0 && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        rowGap: '20px',
                      }}>
                      <h4>За вашим запитом результатів не знайдено.</h4>
                      <button
                        className={'button'}
                        style={{ color: 'white', border: '1px solid white', padding: '5px' }}
                        onClick={() => {
                          router.push('/left-translations');
                          setSearchFilter('');
                        }}>
                        Очистити пошук
                      </button>
                    </div>
                  )}
                  <div className={s.booksList}>
                    {(searchFilter
                      ? searchData
                        ? searchData.results
                        : []
                      : filteredState
                      ? filteredState
                      : []
                    ).map((item: BookProps) => (
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
                      count={data?.count}
                      currentPage={page}
                      entities={data?.results}
                      onChangePage={(idx) => {
                        setPage(idx);
                      }}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
