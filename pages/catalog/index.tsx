import { BreadCrumbs } from '@/components/elements/BreadCrumbs/BreadCrumbs';
import React, { useEffect, useState } from 'react';
import PageTitle from '@/components/elements/PageTitle';
import s from './catalog.module.scss';
import Book, { BookProps } from '@/components/elements/Book';
import CatalogLayout from '@/components/layouts/CatalogLayout';
import Search from '@/components/elements/Search';
import Select from '@/components/elements/Select';
import Filters from '@/components/elements/Filters';
import Divider from '@/components/elements/Divider';
import MobileFiltersModal from '@/components/elements/MobileFiltersModal';
import Button from '@/components/elements/Button';
import clsx from 'clsx';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { BookApiProps, getBooks } from '@/api/bookAPI';
import { useSearch } from '@/hooks/api/useBooks';
import Loader from '@/components/elements/Loader/Loader';
import FetchError from '@/components/elements/FetchError/FetchError';
import Pagination from '@/components/elements/Pagination/Pagination';
import { optionsTitles, useSortFilter } from '@/hooks/useSortFilter';

import {
  BooleanParam,
  createEnumParam,
  NumberParam,
  QueryParamConfig,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params';
import { CommaArrayParam } from '@/utils/queryParamsUtils';
import { useRouter } from 'next/router';

export const getBookQueryParams: {
  age_restrictions: QueryParamConfig<boolean>;
  fund: QueryParamConfig<string | null | undefined>;
  genres: QueryParamConfig<string[]>;
  ordering: QueryParamConfig<string | null | undefined>;
  original_language: QueryParamConfig<'ua' | 'en' | 'fr'>;
  tags: QueryParamConfig<[]>;
  type_book: QueryParamConfig<'translated' | 'origin'>;
  page: QueryParamConfig<number>;
} = {
  age_restrictions: withDefault(BooleanParam),
  fund: StringParam,
  genres: withDefault(CommaArrayParam, []),
  ordering: StringParam,
  original_language: withDefault(createEnumParam(['ua', 'en', 'fr'])),
  tags: withDefault(CommaArrayParam, []),
  type_book: withDefault(createEnumParam(['translated', 'origin'])),
  page: withDefault(NumberParam, 1),
};

export default function CatalogPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useQueryParams(getBookQueryParams);
  const { isLoading, data, isError } = useQuery(
    ['books', { ...filters }],
    () => getBooks(filters),
    {
      keepPreviousData: true,
    }
  );

  return (
    <div className={'container'}>
      <BreadCrumbs
        path={[
          { title: 'Головна', link: '/' },
          { title: 'Каталог', link: '/' },
        ]}
      />
      <PageTitle title="Каталог" />
      <CatalogLayout
        leftSide={
          <LeftSide
            data={data}
            filteredState={data?.results}
            isLoading={isLoading}
            isError={isError}
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
  filterQuery,
  setFilteredQuery,
}: {
  filteredState?: BookProps[];
  data?: BookApiProps;
  isLoading: boolean;
  isError: boolean;
  page: number;
  setPage: (page: number) => void;
  filterQuery: {};
  setFilteredQuery: (prev: any) => void;
}) => {
  const router = useRouter();
  const { search } = router.query;
  const [openMobileFiltersModal, setOpenMobileFiltersModal] = useState(false);
  const { sortType, setOptionByName } = useSortFilter();
  const [searchFilter, setSearchFilter] = useState<string | null>((search as string) || '');
  const { data: searchData } = useSearch(searchFilter);

  useEffect(() => {
    setFilteredQuery((prev) => {
      return { ...prev, ordering: sortType };
    });
  }, [setFilteredQuery, sortType]);

  return (
    <div className={s.marginBottom102}>
      {isLoading ? (
        <Loader size={80} />
      ) : (
        <>
          {isError ? (
            <FetchError />
          ) : (
            <>
              <MobileFiltersModal
                open={openMobileFiltersModal}
                onClose={() => setOpenMobileFiltersModal(false)}
                filterQuery={filterQuery}
                setFilterQuery={setFilteredQuery}
              />
              <Search
                placeholder={'Пошук по каталогу'}
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
                  (searchFilter
                    ? searchData
                      ? searchData.results
                      : []
                    : filteredState
                    ? filteredState
                    : []
                  ).length
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
              <Button
                className={s.mobileFiltersButton}
                onClick={() => setOpenMobileFiltersModal(true)}>
                Фільтри
              </Button>
              <Divider style={{ marginBottom: 40, marginTop: 30 }} />
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
                      router.push('/catalog');
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
                ).map((item) => (
                  <div key={item.id} className={s.booksListItem}>
                    <Book
                      id={item.id}
                      title={item.title}
                      main_photo={item.main_photo}
                      created={item.created}
                      price={'10'}
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
                    setFilteredQuery((prev) => {
                      return { ...prev, page: idx };
                    });
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

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  let isError = false;

  try {
    await queryClient.fetchQuery(['books', 1], () => getBooks(1));
  } catch (error) {
    isError = true;
  }

  return {
    props: {
      isError,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
